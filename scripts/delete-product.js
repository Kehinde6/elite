import db from '@/lib/db'

async function deleteProduct() {
  try {
    // Find the product with the specific name and price
    const product = await db.product.findFirst({
      where: {
        name: 'Luxury Watch',
        price: 2799.99
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