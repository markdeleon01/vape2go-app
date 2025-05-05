import sql from './database'

export type productType = 'P' | 'B' // P = Pod, B = Battery

export interface Product {
    id?: number
    name: string
    brand: string
    price: number
    description: string
    imageUrl: string
    flavourName: string
    puffsNumber: number
    ingredients: string
    typeProduct: productType
    quantity: number
}

export class ProductStore {
    
    // method to return a list of Product
    async index() {
        try {
            //console.log('ProductStore::index()')
            const data = await sql`SELECT * FROM products;`
            //console.log('data='+JSON.stringify(data))
            return data
        } catch (error) {
            throw new Error('Cannot get list of Product: ' + error)
        }
    }

    // method to create a Product
    async create(p: Product) {
        try {
            //console.log('ProductStore::create(p:Product)')
            const data = await sql`INSERT INTO products (name, brand, price, description, imageUrl, flavourName, puffsNumber, ingredients, typeProduct, quantity) VALUES(${p.name}, ${p.brand}, ${p.price}, ${p.description}, ${p.imageUrl}, ${p.flavourName}, ${p.puffsNumber}, ${p.ingredients}, ${p.typeProduct}, ${p.quantity}) RETURNING *`
            //console.log('data='+JSON.stringify(data))
            return data
        } catch (error) {
            throw new Error('Cannot create Product: ' + error)
        }
    }
}