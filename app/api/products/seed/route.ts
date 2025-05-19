import { Product, ProductStore } from '@/app/lib/product'

export async function POST() {
	console.log('POST /products/seed')

	try {
        const store = new ProductStore()
        
        const products: Product[] = [
        {
            name: "Fresh Ice",
            brand: "Valkyrie",
            price: 450.00,
            description: "Valkyrie 15K Fresh Ice",
            flavour_name: "Strawberry Watermelon",
            puffs_number: 15000,
            ingredients: "vegetable glycerin, propylene glycol, organic sweetener, nicotine",
            type_product: "P",
            quantity: 1
        },
        {
            name: "YKL",
            brand: "Royal Elite",
            price: 450.00,
            description: "Royal Elite 12K - YKL",
            flavour_name: "Yakult",
            puffs_number: 12000,
            "type_product": "P",
            quantity: 1
        },
        {
            name: "RUBY",
            brand: "Macaron",
            price: 450.00,
            description: "Macaron Smoke Bomb - RUBY",
            flavour_name: "Watermelon",
            puffs_number: 8000,
            type_product: "P",
            quantity: 2
        },
        {
            name: "GPS",
            brand: "Royal Elite",
            price: 450.00,
            description: "Royal Elite 12K - GPS",
            flavour_name: "Grapes",
            puffs_number: 12000,
            type_product: "P",
            quantity: 1
        },
        {
            name: "Pink Sweetheart",
            brand: "Macaron",
            price: 450.00,
            description: "Macaron Pink Sweetheart",
            flavour_name: "Strawberry Watermelon",
            puffs_number: 8000,
            type_product: "P",
            quantity: 1
        },
        {
            name: "Purple Gemstones",
            brand: "Macaron",
            price: 450.00,
            description: "Macaron Purple Gemstones",
            flavour_name: "Grapes",
            puffs_number: 8000,
            type_product: "P",
            quantity: 1
        },
        {
            name: "Tangy Purple",
            brand: "One Bar",
            price: 450.00,
            description: "One Bar Tangy Purple",
            flavour_name: "Grapes",
            puffs_number: 14000,
            type_product: "P",
            quantity: 1
        },
        {
            name: "Big Red",
            brand: "X-FORGE",
            price: 450.00,
            description: "X-FORGE Big Red",
            flavour_name: "Watermelon",
            puffs_number: 14000,
            type_product: "P",
            quantity: 1
        }
        ]

        for (let index = 0; index < products.length; index++) {
            const p = products[index];
            await createProduct(p, store)
        }
        
        const listProducts = await store.index()
		return Response.json(listProducts)
	} catch (error) {
		console.error(error)
		return Response.json({ error: 'Internal Server Error' }, { status: 500 })
	}

    async function createProduct(p: Product, store: ProductStore) {
        const res = await store.create(p)
        console.log('res=' + JSON.stringify(res))
    }
}