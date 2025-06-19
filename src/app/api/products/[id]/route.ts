import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import db from '@/lib/db';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const brand = formData.get('brand') as string;
    const tags = (formData.get('tags') as string).split(',');
    const image = formData.get('image') as File;

    // Validate input
    if (!name || !description || !price || !brand) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const updateData: any = {
      name,
      description,
      price,
      brand,
      tags,
    };

    // Handle image upload if a new image is provided
    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${image.name}`;
      const path = join(process.cwd(), 'public', 'uploads', filename);

      // Delete old image
      const product = await db.product.findUnique({
        where: { id: params.id },
      });
      if (product?.image) {
        const oldImagePath = join(process.cwd(), 'public', product.image);
        try {
          await unlink(oldImagePath);
        } catch (error) {
          console.error('Error deleting old image:', error);
        }
      }

      await writeFile(path, buffer);
      updateData.image = `/uploads/${filename}`;
    }

    // Update product
    const updatedProduct = await db.product.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { message: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Delete product image
    const product = await db.product.findUnique({
      where: { id: params.id },
    });
    if (product?.image) {
      const imagePath = join(process.cwd(), 'public', product.image);
      try {
        await unlink(imagePath);
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }

    // Delete product
    await db.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { message: 'Failed to delete product' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('Product details API route called for ID:', params.id);
    
    const product = await db.product.findUnique({
      where: {
        id: params.id
      },
      include: {
        externalLinks: true,
        comments: true
      }
    });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ error: "Product not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/products/[id]:', error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch product" }),
      { status: 500 }
    );
  }
} 