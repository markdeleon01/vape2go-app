import { Product, ProductStore } from '@/app/lib/product'

export async function GET() {
	console.log('GET /products')

	try {
		const store = new ProductStore()
		const products: Product[] = (await store.index()) as Product[]
		console.log('products=' + JSON.stringify(products))
		return Response.json(products)
	} catch (error) {
		console.error(error)
		return Response.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}

export async function POST(request: Request) {
	console.log('POST /products')

	try {
		const data = await request.json()
		const store = new ProductStore()
		const newProduct: Product = {
			name: data.name,
			brand: data.brand,
			price: data.price,
			description: data.description,
			image_url: data.image_url,
			flavour_name: data.flavour_name,
			puffs_number: data.puffs_number,
			ingredients: data.ingredients,
			type_product: data.type_product,
			quantity: data.quantity
		}
		const res = await store.create(newProduct)
		console.log('newProduct=' + JSON.stringify(res))
		return Response.json(res)
	} catch (error) {
		console.error(error)
		return Response.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}