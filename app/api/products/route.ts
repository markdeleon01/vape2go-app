export async function GET() {
    console.log('GET /products')

    const products: never[] = []

    return Response.json(products)
}