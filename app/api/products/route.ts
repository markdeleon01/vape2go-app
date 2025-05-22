import { Product, ProductStore } from '@/app/lib/product'
import verifyAuthToken from '@/app/middleware'

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

	// verify the auth token before allowing the user to create a new product
	try {
		await verifyAuthToken(request)
	} catch (error) {
		console.error(error)
		return Response.json(
			{ error: 'Authentication failed' },
			{ status: 401 }
		)
	}
	try {
		const data = await request.json()
		const store = new ProductStore()
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
		const res = await store.create(newProduct)
		console.log('newProduct=' + JSON.stringify(res))
		return Response.json(res[0])
	} catch (error) {
		console.error(error)
		return Response.json(
			{ error: 'Internal Server Error' }, 
			{ status: 500 }
		)
	}
}