import { Product, ProductStore } from '@/app/lib/product'
import { NextResponse } from 'next/server'

export async function GET() {
    console.log('GET /products')

    const store = new ProductStore()
    try {
        const products: Product[]  = await store.index() as Product[]
        console.log(JSON.stringify(products))
        return NextResponse.json(products)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}