import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      password: adminPassword,
      role: 'admin',
    },
  });

  // Create Rolex Daytona Rainbow
  const rolexRainbow = await prisma.product.create({
    data: {
      name: 'Rolex Rainbow Sapphire Daytona Chronograph',
      description: '18kt rose gold case with a gold-tone 18kt rose gold bracelet. Fixed 36 baguette-cut sapphires bezel. Black dial with gold-tone hands and diamond hour markers. Dial Type: Analog. Chronograph - three sub-dials displaying: 60 second, 30 minute and 12 hour. Rolex Calibre 4130 automatic movement with a 72-hour power reserve. Scratch resistant sapphire crystal. Screw down crown. Solid case back. Round case shape. Case size: 40 mm. Water resistant at 100 meters / 330 feet. Functions: chronograph, hour, minute, small second, chronometer. Luxury watch style. Watch label: Swiss Made.',
      image: '/images/watch.jpg',
      brand: 'Rolex',
      category: 'Watches',
      price: 372999,
      userId: admin.id,
      externalLinks: {
        create: [
          {
            retailer: 'Jomashop',
            url: 'https://www.jomashop.com/rolex-watch-116595rbowdp.html',
            price: 519500,
            deliveryTime: '3-5 business days',
            returnPolicy: '30-day return policy'
          },
          {
            retailer: 'Jaztime',
            url: 'https://www.jaztime.com/rolex-cosmograph-daytona-116595rbow-black-rainbow-sapphires-diamond-set-rose-gold-oyster-40mm',
            price: 372999,
            deliveryTime: '1-3 business days',
            returnPolicy: '14-day return policy'
          },
          {
            retailer: 'G&G Timepieces',
            url: 'https://gandgtimepieces.com/products/rolex-2018-daytona-116595rbow',
            price: 396550,
            deliveryTime: '2-4 business days',
            returnPolicy: '7-day return policy'
          },
          {
            retailer: 'Luxury Watches USA',
            url: 'https://luxurywatchesusa.com/product/rolex-cosmograph-daytona-116595rbow-everose-gold-rainbow-sapphire-watch',
            price: 462600,
            deliveryTime: '2-3 business days',
            returnPolicy: '21-day return policy'
          },
          {
            retailer: 'The Perpetual Watch',
            url: 'https://theperpetualwatch.com/products/new-rolex-daytona-116595rbow',
            price: 758000,
            deliveryTime: '1-2 business days',
            returnPolicy: '30-day return policy'
          }
        ]
      }
    }
  });

  // Create Rolex product
  const rolex = await prisma.product.create({
    data: {
      name: 'Rolex Daytona Yellow Gold - Bracelet',
      description: '40mm 18K yellow gold case, screw-down back, screw-down crown and push buttons with Triplock triple waterproofness, fixed 18K yellow gold bezel with engraved tachymetric scale, scratch-resistant sapphire crystal, white dial, index hour markers, Rolex calibre 4130 self-winding movement with chronograph central second hand, 30-minute counter at 3 o\'clock, and 12-hour counter at 9 o\'clock, approximately 72 hours of power reserve, 18K yellow gold Oyster bracelet with flat three-piece links, folding Oysterlock buckle with Easylink 5mm comfort extension link. Waterproof to 100 meters.',
      image: '/images/Rolex Daytona.jpg',
      brand: 'Rolex',
      category: 'Watches',
      price: 57250.00,
      userId: admin.id,
      externalLinks: {
        create: [
          {
            url: 'https://www.jomashop.com/rolex-watch-116508wso.html',
            price: 57250.00,
            retailer: 'Jomashop',
            deliveryTime: '3-5 business days',
            returnPolicy: '30 days return policy'
          },
          {
            url: 'https://diamondclubmiami.com/products/rolex-daytona-ref-116508',
            price: 55167.00,
            retailer: 'Diamond Club Miami',
            deliveryTime: '2-3 business days',
            returnPolicy: '14 days return policy'
          },
          {
            url: 'https://timepieceperfection.com/products/daytona-yellow-gold-bracelet-29874',
            price: 63765.00,
            retailer: 'Timepiece Perfection',
            deliveryTime: '1-2 business days',
            returnPolicy: '7 days return policy'
          },
          {
            url: 'https://www.bijouxmedusa.com/en-us/products/rolex-cosmograph-daytona-40mm-meteorite-gold',
            price: 93653.00,
            retailer: 'Bijoux Medusa',
            deliveryTime: '3-5 business days',
            returnPolicy: '14 days return policy'
          }
        ]
      },
      comments: {
        create: [
          {
            name: 'James W.',
            text: 'Stunning timepiece with exceptional craftsmanship. The yellow gold finish is impeccable.',
            rating: 5
          },
          {
            name: 'Michael T.',
            text: 'The Daytona is a true classic. The automatic movement keeps perfect time.',
            rating: 5
          }
        ]
      }
    }
  });

  // Create Patek Philippe product
  const patekPhilippe = await prisma.product.create({
    data: {
      name: 'Patek Philippe Nautilus 5726/1A with 34.65 Ct VS Diamond',
      description: `Model/SKU: WTCH-31215
Pre-owned with customization, this Patek Philippe Nautilus 5726/1A features a 40.5mm stainless steel case with scratch-resistant sapphire crystal. 

Specifications:
- Model Number: 5726/1A
- Production Year: 2010-2019
- Movement: Swiss Automatic
- Case Material: Stainless Steel
- Band Material: Steel with Diamond
- Functions: Chronograph, Water Resistant (50ft or less), Date
- Dial Type: Analog

Diamond Details:
- Natural Earth Mined Diamonds
- Setting: Pave
- Total Weight: 34.65 carats
- Cut: Excellent
- Shape: Round
- Clarity: VVS1-VS1
- Color: F-G

Includes original Patek Philippe box/papers and a lab report for diamonds.`,
      image: '/images/Patek Philippe.jpg',
      brand: 'Patek Philippe',
      category: 'Watches',
      price: 104856.99,
      userId: admin.id,
      externalLinks: {
        create: [
          {
            url: 'https://www.nycluxury.com/products/patek-phillipe-nautilus-3',
            price: 104856.99,
            retailer: 'NYC Luxury',
            deliveryTime: '3-5 business days',
            returnPolicy: '30-day returns'
          },
          {
            url: 'https://www.jewelryunlimited.com/patek-philippe-nautilus-5726-1a-with-34-65-ct-vs-diamond-31215',
            price: 125000.00,
            retailer: 'Jewelry Unlimited',
            deliveryTime: '5-7 business days',
            returnPolicy: '14-day returns'
          },
          {
            url: 'https://www.walmart.com/ip/Patek-Philippe-Patek-Philippe-Nautilus-5726-1A-with-34-65-Ct-VS-Diamond/948933765',
            price: 116875.00,
            retailer: 'Walmart',
            deliveryTime: '2-3 business days',
            returnPolicy: '90-day returns'
          },
          {
            url: 'https://www.ebay.com/itm/132137517921',
            price: 125000.00,
            retailer: 'eBay',
            deliveryTime: 'Varies by seller',
            returnPolicy: 'Varies by seller'
          }
        ]
      },
      comments: {
        create: [
          {
            name: 'Robert Johnson',
            text: 'The diamond setting is absolutely stunning. The VVS1-VS1 clarity is remarkable.',
            rating: 5
          }
        ]
      }
    }
  });

  // Create Designer Handbag product
  const designerHandbag = await prisma.product.create({
    data: {
      name: 'Designer Handbag',
      description: 'Exclusive designer handbag crafted from the finest leather.',
      image: '/images/handbag.jpg',
      category: 'Handbags',
      price: 2499.99,
      userId: admin.id,
      externalLinks: {
        create: [
          {
            url: 'https://www.designerboutique.com/luxury-handbag',
            price: 2499.99,
            retailer: 'Designer Boutique',
            deliveryTime: '2-3 business days',
            returnPolicy: '30-day returns'
          }
        ]
      }
    }
  });

  // Create Patek Philippe Grand Complications
  const patekCelestial = await prisma.product.create({
    data: {
      name: 'Patek Philippe Grand Complications 6102P-001',
      description: `Highlighting Patek Philippe's great tradition of astronomical watches, the Celestial devotes its dial to a rotating chart of the heavenly bodies. This exquisite timepiece features:

Specifications:
- Brand: Patek Philippe
- Reference: 6102p-001
- Bracelet: Alligator Leather Strap
- Calibre: 240 LU CL C
- Dial color: Blue
- Diameter: 44 mm
- Glass: Sapphire
- Material: Platinum
- Model: Grand Complications
- Movement: Automatic
- Shape: Round
- Water resistance: 30 m
- Condition: Unworn
- Box/Papers: Original Box and Papers
- Warranty: Balance of Patek Philippe 2-year Warranty
- Manufactured: Switzerland

The watch features a self-winding mechanical movement with sky chart, phases and orbit of the Moon, and time of meridian passage of Sirius and the moon. The case is crafted in platinum with a sapphire crystal case back.`,
      image: '/images/Patek Philippe Celestial.jpg',
      brand: 'Patek Philippe',
      category: 'Watches',
      price: 265762,
      userId: admin.id,
      externalLinks: {
        createMany: {
          data: [
            {
              url: 'https://nycwatcher.com/products/patek-philippe-grand-complications-platinum-44-mm-blue-leather-strap-blue-sapphire-dial-6102p-001',
              price: 265762,
              retailer: 'NYC Watcher',
              deliveryTime: '2-3 business days',
              returnPolicy: '30-day return policy'
            },
            {
              url: 'https://miojewelry.com/patek-philippe-watches/grand-complications/6102p-001/',
              price: 415000,
              retailer: 'Mio Jewelry',
              deliveryTime: '3-5 business days',
              returnPolicy: '14-day return policy'
            },
            {
              url: 'https://diamondsourcenyc.com/products/patek-philippe-grand-complications-6102p-001',
              price: 435000,
              retailer: 'Diamond Source NYC',
              deliveryTime: '2-4 business days',
              returnPolicy: '30-day return policy'
            },
            {
              url: 'https://skydiamondco.com/products/patek-philippe-grand-complications-self-winding-6102p-001',
              price: 473500,
              retailer: 'Sky Diamond Co',
              deliveryTime: '3-5 business days',
              returnPolicy: '21-day return policy'
            }
          ]
        }
      }
    }
  });

  console.log({ admin, rolexRainbow, rolex, patekPhilippe, designerHandbag, patekCelestial });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 