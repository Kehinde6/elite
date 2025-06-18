const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function deleteProduct() {
  try {
    // Find the product with the specific name and price
    const product = await prisma.product.findFirst({
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
    await prisma.product.delete({
      where: {
        id: product.id
      }
    })

    console.log('Product deleted successfully')
  } catch (error) {
    console.error('Error deleting product:', error)
  } finally {
    await prisma.$disconnect()
  }
}

deleteProduct() 