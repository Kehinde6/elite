const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function removeLuxuryWatch() {
  try {
    // First, delete all external links and comments associated with the product
    const product = await prisma.product.findFirst({
      where: {
        name: 'Luxury Watch'
      }
    })

    if (!product) {
      console.log('Product not found')
      return
    }

    // Delete associated external links
    await prisma.externalLink.deleteMany({
      where: {
        productId: product.id
      }
    })

    // Delete associated comments
    await prisma.comment.deleteMany({
      where: {
        productId: product.id
      }
    })

    // Delete the product
    await prisma.product.delete({
      where: {
        id: product.id
      }
    })

    console.log('Product and associated data deleted successfully')
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

removeLuxuryWatch() 