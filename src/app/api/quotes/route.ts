import { NextResponse } from 'next/server';
import quotesData from '@/public/data/quotes.json';

export async function GET() {
  try {
    const quotes = quotesData.quotes;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    return NextResponse.json({ 
      quote,
      total: quotes.length 
    }, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate'
      }
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch quote' },
      { status: 500 }
    );
  }
}


==================================================


// src/app/api/quotes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import quotesData from '@/public/data/quotes.json';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const mood = searchParams.get('mood');
    const limit = searchParams.get('limit') || '10';

    let quotes = quotesData.quotes;

    if (category) {
      quotes = quotes.filter(q => q.category === category);
    }

    if (mood) {
      quotes = quotes.filter(q => q.mood === mood);
    }

    quotes = quotes.slice(0, parseInt(limit));

    return NextResponse.json({ 
      quotes,
      total: quotes.length 
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600'
      }
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch quotes' },
      { status: 500 }
    );
  }
}


==================================================


// src/app/api/config/route.ts
import { NextResponse } from 'next/server';
import configData from '@/public/data/config.json';

export async function GET() {
  try {
    return NextResponse.json(configData, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400'
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch config' },
      { status: 500 }
    );
  }
}

