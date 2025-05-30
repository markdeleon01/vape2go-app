import sql from './database'

export type productType = 'P' | 'B' // P = Pod, B = Battery

export interface Product {
	id?: number | undefined
	name: string | undefined
	brand: string | undefined
	price: number | undefined
	description?: string | undefined
	image_blob?: File | undefined
	flavour_name: string | undefined
	puffs_number: number | undefined
	ingredients?: string | undefined
	type_product: string | undefined
	quantity: number | undefined
}

export class ProductStore {
	// method to return a list of Product
	async index() {
		try {
			const data = await sql`SELECT * FROM products ORDER BY id;`
			return data
		} catch (error) {
			throw new Error(`Cannot get list of Products.  Error: ${error}`)
		}
	}

	// method to create a Product
	async create(p: Product) {
		try {
			const imageBlob = p.image_blob
				? p.image_blob
				: null
			console.log('create::imageBlob', imageBlob)
			const data =
				await sql`INSERT INTO products (name, brand, price, description, image_blob, flavour_name, puffs_number, ingredients, type_product, quantity) VALUES(${p.name}, ${p.brand}, ${p.price}, ${p.description}, ${imageBlob}, ${p.flavour_name}, ${p.puffs_number}, ${p.ingredients}, ${p.type_product}, ${p.quantity}) RETURNING *`
			return data
		} catch (error) {
			throw new Error(`Cannot create Product.  Error: ${error}`)
		}
	}

	// method to return details of a Product
	async show(id: number) {
		try {
			const data = await sql`SELECT * FROM products WHERE id=${id}`
			return data
		} catch (error) {
			throw new Error(`Could not find product ${id}. Error: ${error}`)
		}
	}

	// method to update details of a Product
	async update(id: number, p: Product) {
		try {
			const imageBlob = p.image_blob
				? p.image_blob
				: null
			console.log('update::imageBlob', imageBlob)
			const data =
				await sql`UPDATE products SET name = ${p.name}, brand = ${p.brand}, price = ${p.price}, description = ${p.description}, image_blob = ${imageBlob}, flavour_name = ${p.flavour_name}, puffs_number = ${p.puffs_number}, ingredients = ${p.ingredients}, type_product = ${p.type_product}, quantity = ${p.quantity} WHERE id=${id} RETURNING *`
			return data
		} catch (error) {
			throw new Error(`Could not update product ${id}. Error: ${error}`)
		}
	}

	// method to return details of a Product
	async delete(id: number) {
		try {
			const data = await sql`DELETE FROM products WHERE id=${id}`
			return data
		} catch (error) {
			throw new Error(`Could not find product ${id}. Error: ${error}`)
		}
	}
}
