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
            console.log('ProductStore::index()')
            const data = await sql`SELECT * FROM products;`
            return data
        } catch (error) {
            throw new Error('Cannot get list of Product: ' + error)
        }
    }
}