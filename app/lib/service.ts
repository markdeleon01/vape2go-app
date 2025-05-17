import { Product } from './product'

export async function getProducts() {
	const data = await fetch('http://localhost:3000/api/products')
	return await data.json()
}

export async function getProduct(id: number) {
	const data = await fetch('http://localhost:3000/api/products/' + id)
	return await data.json()
}

export async function updateProduct(id: number, p: Product) {
	const data = await fetch('http://localhost:3000/api/products/' + id, {
		method: 'PATCH',
		body: JSON.stringify(p)
	})
	return await data.json()
}

export async function addProduct(p: Product) {
	const data = await fetch('http://localhost:3000/api/products/', {
		method: 'POST',
		body: JSON.stringify(p)
	})
	return await data.json()
}

export async function deleteProduct(id: number) {
	const data = await fetch('http://localhost:3000/api/products/' + id, {
		method: 'DELETE'
	})
	return await data.json()
}
