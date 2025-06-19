import db from "@/lib/db"

async function deleteProduct() {
  try {
    // Find the product with the specific image URL
    const product = await db.product.findFirst({
      where: {
        image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
      }
    })

    if (!product) {
      console.log('Product not found')
      return
    }

    // Delete the product
    await db.product.delete({
      where: {
        id: product.id
      }
    })

    console.log('Product deleted successfully')
  } catch (error) {
    console.error('Error deleting product:', error)
  } finally {
    await db.$disconnect()
  }
}

deleteProduct() 