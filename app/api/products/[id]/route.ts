import { Product, ProductStore } from '@/app/lib/product'

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
                return Response.json(res[0])
            } else {
                return Response.json({ error: 'Not found request id '+id }, { status: 404 })
            }

        }
    } catch (error) {
        console.error(error)
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    console.log('PATCH /products/{id}')
    
    try {
        const { id } = await params
        console.log('id='+id)
        const data = await request.json()
        const store = new ProductStore()
        const productId = parseInt(id)
        if (isNaN(productId)) {
            return Response.json({ error: 'Invalid request id '+id }, { status: 400 })
        } else {
            const newProduct: Product = {
                name: data.name,
                brand: data.brand,
                price: data.price,
                description: data.description,
                image_blob: data.image_blob,
                flavour_name: data.flavour_name,
                puffs_number: data.puffs_number,
                ingredients: data.ingredients,
                type_product: data.type_product,
                quantity: data.quantity
            }
            const res = await store.update(productId, newProduct)
            console.log('product='+JSON.stringify(res))
            if (res.length > 0) {
                return Response.json(res[0])
            } else {
                return Response.json({ error: 'Not found request id '+id }, { status: 404 })
            }
        }
    } catch (error) {
        console.error(error)
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    console.log('DELETE /products/{id}')

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
                const res = await store.delete(productId)
                return Response.json(res[0])
            } else {
                return Response.json({ error: 'Not found request id '+id }, { status: 404 })
            }

        }
    } catch (error) {
        console.error(error)
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}