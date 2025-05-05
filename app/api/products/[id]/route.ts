import { ProductStore } from '@/app/lib/product'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    console.log('GET /products/{id}')

    try {
        const { id } = await params
        console.log('id='+id)
        const store = new ProductStore()
        const productId = parseInt(id)
        if (isNaN(productId)) {
            return Response.json({ error: 'Invalid request id '+id }, { status: 400 })
        } else {
            const res = await store.show(productId)
            console.log('product='+JSON.stringify(res))
            if (res.length > 0) {
                return Response.json(res)
            } else {
                return Response.json({ error: 'Not found request id '+id }, { status: 404 })
            }

        }
    } catch (error) {
        console.error(error)
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}