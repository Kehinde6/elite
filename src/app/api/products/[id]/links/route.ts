import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

interface ExternalLink {
  id: string;
  siteName: string;
  url: string;
  price: number;
  rating: number;
  deliveryTime: string;
  returnPolicy: string;
}

type MockLinks = {
  [key: string]: ExternalLink[];
}

// Mock data for demonstration
const mockLinks: MockLinks = {
  '1': [
    {
      id: '1',
      siteName: 'Chrono24',
      url: 'https://www.chrono24.com/rolex/rolex-daytona-yellow-gold--id1.htm',
      price: 12999.99,
      rating: 4.8,
      deliveryTime: '3-5 business days',
      returnPolicy: '14 days return policy'
    },
    {
      id: '2',
      siteName: 'WatchBox',
      url: 'https://www.thewatchbox.com/rolex-daytona-yellow-gold',
      price: 13500.00,
      rating: 4.7,
      deliveryTime: '2-3 business days',
      returnPolicy: '7 days return policy'
    },
    {
      id: '3',
      siteName: 'Bob\'s Watches',
      url: 'https://www.bobswatches.com/rolex-daytona-yellow-gold',
      price: 13250.00,
      rating: 4.9,
      deliveryTime: '1-2 business days',
      returnPolicy: '30 days return policy'
    },
    {
      id: '4',
      siteName: 'Crown & Caliber',
      url: 'https://www.crownandcaliber.com/rolex-daytona-yellow-gold',
      price: 13100.00,
      rating: 4.6,
      deliveryTime: '2-4 business days',
      returnPolicy: '14 days return policy'
    },
    {
      id: '5',
      siteName: 'Watchfinder',
      url: 'https://www.watchfinder.com/rolex-daytona-yellow-gold',
      price: 13300.00,
      rating: 4.8,
      deliveryTime: '3-5 business days',
      returnPolicy: '14 days return policy'
    }
  ],
  '9': [
    {
      id: '11',
      siteName: 'Jomashop',
      url: 'https://www.jomashop.com/rolex-cosmograph-daytona-chronograph-automatic-chronometer-diamond-watch-116595-rbowpav.html',
      price: 950000.00,
      rating: 4.5,
      deliveryTime: '3-5 business days',
      returnPolicy: '30 days'
    },
    {
      id: '12',
      siteName: 'Luxury Watches USA',
      url: 'https://luxurywatchesusa.com/product/rolex-cosmograph-daytona-116595-diamond-dial-everose-gold-rainbow-sapphire-watch/',
      price: 475000.00,
      rating: 4.7,
      deliveryTime: '5-7 business days',
      returnPolicy: '14 days'
    },
    {
      id: '13',
      siteName: 'Chrono24',
      url: 'https://www.chrono24.com/rolex/cosmograph-everose-daytona-factory-diamond-rainbow-edition--id23627139.htm',
      price: 450000.00,
      rating: 4.8,
      deliveryTime: '2-3 business days',
      returnPolicy: '14 days'
    },
    {
      id: '14',
      siteName: 'eBay',
      url: 'https://www.ebay.com/itm/204991053628',
      price: 57900.00,
      rating: 4.6,
      deliveryTime: '3-5 business days',
      returnPolicy: '30 days'
    }
  ],
  '2': [
    {
      id: '6',
      siteName: 'NYC Luxury',
      url: 'https://www.nycluxury.com/products/patek-phillipe-nautilus-3',
      price: 104856.99,
      rating: 4.8,
      deliveryTime: '2-3 business days',
      returnPolicy: '14 days'
    },
    {
      id: '7',
      siteName: 'eBay',
      url: 'https://www.ebay.com/itm/236047345558',
      price: 106699.00,
      rating: 4.6,
      deliveryTime: '3-5 business days',
      returnPolicy: '30 days'
    },
    {
      id: '8',
      siteName: 'Jewelry Unlimited',
      url: 'https://www.jewelryunlimited.com/patek-philippe-nautilus-5726-1a',
      price: 125000.00,
      rating: 4.7,
      deliveryTime: '5-7 business days',
      returnPolicy: '14 days'
    },
    {
      id: '9',
      siteName: 'Walmart',
      url: 'https://www.walmart.com/ip/Patek-Philippe-Patek-Philippe-Nautilus-5726-1A',
      price: 116875.00,
      rating: 4.5,
      deliveryTime: '3-5 business days',
      returnPolicy: '30 days'
    }
  ],
  '10': [
    {
      id: '15',
      siteName: 'Jomashop',
      url: 'https://www.jomashop.com/patek-philippe-watch-6102p-001.html?recrawl=true&gQT=1',
      price: 415000.00,
      rating: 4.9,
      deliveryTime: '2-3 business days',
      returnPolicy: '30 days'
    },
    {
      id: '16',
      siteName: 'Jomashop',
      url: 'https://www.jomashop.com/patek-philippe-grand-complications-blue-dial-unisex-watch-6104p-001.html',
      price: 1075000.00,
      rating: 4.8,
      deliveryTime: '3-5 business days',
      returnPolicy: '30 days'
    },
    {
      id: '17',
      siteName: 'Jomashop',
      url: 'https://www.jomashop.com/patek-philippe-celestial-automatic-baguette-diamond-blue-dial-mens-watch-6104-1g-010.html',
      price: 816500.00,
      rating: 4.7,
      deliveryTime: '4-6 business days',
      returnPolicy: '30 days'
    }
  ]
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const links = await prisma.externalLink.findMany({
      where: {
        productId: params.id
      }
    });

    return NextResponse.json(links);
  } catch (error) {
    console.error('Error fetching links:', error);
    return NextResponse.json({ error: 'Failed to fetch links' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const link = await prisma.externalLink.create({
      data: {
        ...body,
        productId: params.id
      }
    });
    return NextResponse.json(link);
  } catch (error) {
    console.error('Error creating link:', error);
    return NextResponse.json({ error: 'Failed to create link' }, { status: 500 });
  }
} 