import db from '@/lib/db'

async function removeLuxuryWatch() {
  try {
    // Find the product
    const product = await db.product.findFirst({
      where: {
        name: 'Luxury Watch'
      }
    })

    if (!product) {
      console.log('Product not found')
      return
    }

    // Delete associated external links
    await db.externalLink.deleteMany({
      where: {
        productId: product.id
      }
    })

    // Delete associated comments
    await db.comment.deleteMany({
      where: {
        productId: product.id
      }
    })

    // Delete the product
    await db.product.delete({
      where: {
        id: product.id
      }
    })

    console.log('Product and associated data deleted successfully')
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await db.$disconnect()
  }
}

removeLuxuryWatch()