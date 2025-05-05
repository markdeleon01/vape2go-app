import { Product, ProductStore } from '@/app/lib/product'

export async function GET() {
    console.log('GET /products')

    const store = new ProductStore()
    try {
        const products: Product[]  = await store.index() as Product[]
        console.log('products='+JSON.stringify(products))
        return Response.json(products)
    } catch (error) {
        console.error(error)
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    console.log('POST /products')
    const data = await request.json()
    try {
        const store = new ProductStore()
        const newProduct: Product = {
            name: data.name,
            brand: data.brand,
            price: data.price,
            description: data.description,
            imageUrl: data.imageUrl,
            flavourName: data.flavourName,
            puffsNumber: data.puffsNumber,
            ingredients: data.ingredients,
            typeProduct: data.typeProduct,
            quantity: data.quantity
        }
        const res = await store.create(newProduct)
        console.log('newProduct='+JSON.stringify(res))
        return Response.json(res)
    } catch (error) {
        console.error(error)
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}