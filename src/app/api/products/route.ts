import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import db from '@/lib/db';
import { writeFile } from 'fs/promises';
import { join } from 'path';

// Mock data for demonstration
const mockComments = [
  {
    id: '1',
    productId: '1',
    name: 'John Doe',
    text: 'Excellent watch, very satisfied with my purchase!',
    rating: 5
  },
  {
    id: '2',
    productId: '1',
    name: 'Jane Smith',
    text: 'Beautiful craftsmanship, worth every penny.',
    rating: 4
  },
  {
    id: '3',
    productId: '2',
    name: 'Robert Johnson',
    text: 'The diamond setting is absolutely stunning.',
    rating: 5
  }
];

const mockProducts = [
  {
    id: '1',
    name: 'Rolex Daytona Yellow Gold - Bracelet',
    price: 12999.99,
    image: '/images/Rolex Daytona.jpg',
    description: 'The Rolex Daytona is a legendary chronograph watch known for its precision and luxury. This particular model features a yellow gold case and bracelet, ceramic bezel, and a sophisticated movement that has been certified as a chronometer.',
    brand: 'Rolex',
    category: 'Watches',
    specifications: {
      caseMaterial: 'Yellow Gold',
      caseSize: '40mm',
      movement: 'Automatic',
      waterResistance: '100m',
      powerReserve: '72 hours',
      crystal: 'Scratch-Resistant Sapphire',
      dialType: 'Analog',
      features: ['Chronograph', 'Tachymeter', 'Date Display']
    }
  },
  {
    id: '2',
    name: 'Patek Philippe Nautilus',
    price: 104856.99,
    image: '/images/Patek Philippe.jpg',
    description: 'A stunning Patek Philippe Nautilus featuring 34.65 carats of VS diamonds. This pre-owned timepiece comes with original box, papers, and a lab report for the diamonds.',
    brand: 'Patek Philippe',
    category: 'Watches',
    specifications: {
      caseMaterial: 'Stainless Steel',
      caseSize: '40.5mm',
      movement: 'Swiss Automatic',
      waterResistance: '50m',
      features: ['Chronograph', 'Date'],
      crystal: 'Scratch-Resistant Sapphire',
      dialType: 'Analog'
    }
  },
  {
    id: '3',
    name: 'Designer Handbag',
    price: 2499.99,
    image: '/images/handbag.jpg',
    description: 'Exclusive designer handbag crafted from the finest leather.',
    category: 'Handbags'
  },
  {
    id: '4',
    name: 'Premium Perfume',
    price: 299.99,
    image: '/images/perfume.jpg',
    description: 'Luxurious fragrance with notes of rare ingredients.',
    category: 'Perfumes'
  },
  {
    id: '5',
    name: 'Diamond Earrings',
    price: 3499.99,
    image: '/images/earrings.jpg',
    description: 'Exquisite diamond earrings set in premium gold.',
    category: 'Jewelry'
  },
  {
    id: '6',
    name: 'Silk Scarf',
    price: 199.99,
    image: '/images/scarf.jpg',
    description: 'Handcrafted silk scarf with unique patterns.',
    category: 'Accessories'
  },
  {
    id: '7',
    name: 'Leather Wallet',
    price: 399.99,
    image: '/images/wallet.jpg',
    description: 'Premium leather wallet with multiple compartments.',
    category: 'Accessories'
  },
  {
    id: '10',
    name: 'Patek Philippe Men\'s Grand Complications Celestial Automatic Moon Phase Dial',
    price: 415000.00,
    image: '/images/Patek Philippe Celestial.jpg',
    description: 'White platinum case with a blue alligator leather strap. Fixed white platinum bezel. Blue sky chart dial with silver-toned skeleton leaf-style shape hands and Arabic numeral hour markers. Date scale appears around the outer rim. Dial Type: Analog. Pointer date. One subdial displaying: moonphase. Patek Philippe Calibre 240 LU CL C Automatic movement, containing 45 Jewels, composed of 315 parts, bitting at 21600 vph, and has a power reserve of approximately 48 hours. Scratch resistant sapphire crystal. Sapphire crystal case back. Round case shape, case size: 44 mm. Tang clasp. Water resistant at 30 meters / 100 feet. Functions: hour, minute, second, date, sky chart, phases and orbit of the moon. Additional Info: displays sky chart and orbit of the moon. Grand Complications Series. Luxury watch style. Watch label: Swiss Made. Item Variations: 6102P 001, 6102P.001, 6102P001. Patek Philippe Grand Complications Platinum Men\'s Watch 6102P-001.',
    brand: 'Patek Philippe',
    category: 'Watches',
    specifications: {
      caseMaterial: 'Platinum',
      caseSize: '44mm',
      movement: 'Patek Philippe Calibre 240 LU CL C Automatic',
      waterResistance: '30 meters / 100 feet',
      powerReserve: '48 hours',
      crystal: 'Scratch Resistant Sapphire',
      dialType: 'Analog',
      dialColor: 'Blue Sky Chart',
      dialMarkers: 'Arabic Numeral',
      hands: 'Silver-toned Skeleton Leaf-style shape',
      subDials: 'One - Moonphase',
      bezel: {
        type: 'Fixed',
        color: 'White',
        material: 'Platinum'
      },
      band: {
        material: 'Alligator Leather',
        type: 'Strap',
        color: 'Blue',
        clasp: 'Tang'
      },
      features: [
        'Hour',
        'Minute',
        'Second',
        'Date',
        'Sky chart',
        'Phases and orbit of the Moon',
        'Pointer Date',
        'Sapphire crystal case back'
      ],
      additionalInfo: {
        collection: 'Grand Complications',
        gender: 'Mens',
        model: '6102P-001',
        watchLabel: 'Swiss Made',
        engine: 'Patek Philippe Calibre 240 LU CL C',
        warranty: '2 Year Jomashop Warranty',
        style: 'Luxury'
      }
    }
  }
];

const mockExternalLinks = [
  {
    id: '1',
    productId: '1',
    siteName: 'Jomashop',
    url: 'https://www.jomashop.com/rolex-daytona.html',
    price: 12999.99,
    rating: 4.5,
    deliveryTime: '3-5 business days',
    returnPolicy: '30 days'
  },
  {
    id: '2',
    productId: '1',
    siteName: 'Chrono24',
    url: 'https://www.chrono24.com/rolex/daytona.htm',
    price: 13500.00,
    rating: 4.7,
    deliveryTime: '5-7 business days',
    returnPolicy: '14 days'
  },
  {
    id: '11',
    productId: '9',
    siteName: 'Jomashop',
    url: 'https://www.jomashop.com/rolex-cosmograph-daytona-chronograph-automatic-chronometer-diamond-watch-116595-rbowpav.html',
    price: 950000.00,
    rating: 4.5,
    deliveryTime: '3-5 business days',
    returnPolicy: '30 days'
  },
  {
    id: '12',
    productId: '9',
    siteName: 'Luxury Watches USA',
    url: 'https://luxurywatchesusa.com/product/rolex-cosmograph-daytona-116595-diamond-dial-everose-gold-rainbow-sapphire-watch/',
    price: 475000.00,
    rating: 4.7,
    deliveryTime: '5-7 business days',
    returnPolicy: '14 days'
  },
  {
    id: '13',
    productId: '9',
    siteName: 'Chrono24',
    url: 'https://www.chrono24.com/rolex/cosmograph-everose-daytona-factory-diamond-rainbow-edition--id23627139.htm',
    price: 450000.00,
    rating: 4.8,
    deliveryTime: '2-3 business days',
    returnPolicy: '14 days'
  },
  {
    id: '14',
    productId: '9',
    siteName: 'eBay',
    url: 'https://www.ebay.com/itm/204991053628',
    price: 57900.00,
    rating: 4.6,
    deliveryTime: '3-5 business days',
    returnPolicy: '30 days'
  },
  {
    id: '3',
    productId: '2',
    siteName: 'NYC Luxury',
    url: 'https://www.nycluxury.com/products/patek-phillipe-nautilus-3?variant=34742069446&country=US&currency=USD&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&gQT=2',
    price: 104856.99,
    rating: 4.8,
    deliveryTime: '2-3 business days',
    returnPolicy: '14 days'
  },
  {
    id: '4',
    productId: '2',
    siteName: 'Walmart',
    url: 'https://www.walmart.com/ip/Patek-Philippe-Patek-Philippe-Nautilus-5726-1A-with-34-65-Ct-VS-Diamond/948933765?wmlspartner=wlpa&selectedSellerId=4608&selectedOfferId=728FC578F5024CCBA87E913DE2EDE40D&conditionGroupCode=1&gQT=2',
    price: 116875.00,
    rating: 4.6,
    deliveryTime: '3-5 business days',
    returnPolicy: '30 days'
  },
  {
    id: '5',
    productId: '2',
    siteName: 'Jewelry Unlimited',
    url: 'https://www.jewelryunlimited.com/patek-philippe-nautilus-5726-1a-with-34-65-ct-vs-diamond-31215?gQT=2',
    price: 125000.00,
    rating: 4.7,
    deliveryTime: '5-7 business days',
    returnPolicy: '14 days'
  },
  {
    id: '6',
    productId: '2',
    siteName: 'eBay',
    url: 'https://www.ebay.com/itm/132137517921?chn=ps&google_free_listing_action=view_item&gQT=2',
    price: 125000.00,
    rating: 4.6,
    deliveryTime: '3-5 business days',
    returnPolicy: '30 days'
  },
  {
    id: '15',
    productId: '10',
    siteName: 'Jomashop',
    url: 'https://www.jomashop.com/patek-philippe-watch-6102p-001.html?recrawl=true&gQT=1',
    price: 415000.00,
    rating: 4.9,
    deliveryTime: '2-3 business days',
    returnPolicy: '30 days'
  },
  {
    id: '16',
    productId: '10',
    siteName: 'Jomashop',
    url: 'https://www.jomashop.com/patek-philippe-grand-complications-blue-dial-unisex-watch-6104p-001.html',
    price: 1075000.00,
    rating: 4.8,
    deliveryTime: '3-5 business days',
    returnPolicy: '30 days'
  },
  {
    id: '17',
    productId: '10',
    siteName: 'Jomashop',
    url: 'https://www.jomashop.com/patek-philippe-celestial-automatic-baguette-diamond-blue-dial-mens-watch-6104-1g-010.html',
    price: 816500.00,
    rating: 4.7,
    deliveryTime: '4-6 business days',
    returnPolicy: '30 days'
  }
];

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
      'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    },
  });
}

export async function GET() {
  try {
    console.log('Products API route called');
    
    const products = await db.product.findMany({
      include: {
        externalLinks: true,
        comments: true
      }
    });

    if (!products || products.length === 0) {
      return new NextResponse(JSON.stringify([]), { status: 200 });
    }

    console.log('Fetched products:', products); // Debug log
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/products:', error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch products" }),
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, description, image, category, price, brand } = data;

    const product = await db.product.create({
      data: {
        name,
        description,
        image,
        category,
        price,
        brand,
        userId: 'cma2lehjj0000jfapk3yyj9pw' // Using the admin user ID from the seed
      }
    });

    return new NextResponse(JSON.stringify(product), { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/products:', error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to create product" }),
      { status: 500 }
    );
  }
} 