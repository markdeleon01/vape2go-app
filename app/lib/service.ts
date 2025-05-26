import { getUserAuthentication } from './authentication'
import { Product } from './product'
import { User } from './user'

export async function getProducts() {
	const data = await fetch('http://localhost:3000/api/products')
	return await data.json()
}

export async function getProduct(id: number) {
	const data = await fetch('http://localhost:3000/api/products/' + id, {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + getUserAuthentication()
		}
	})
	return await data.json()
}

export async function updateProduct(id: number, p: Product) {
	const data = await fetch('http://localhost:3000/api/products/' + id, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + getUserAuthentication()
		},
		body: JSON.stringify(p)
	})
	return await data.json()
}

export async function addProduct(p: Product) {
	const data = await fetch('http://localhost:3000/api/products/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + getUserAuthentication()
		},
		body: JSON.stringify(p)
	})
	return await data.json()
}

export async function deleteProduct(id: number) {
	const data = await fetch('http://localhost:3000/api/products/' + id, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + getUserAuthentication()
		}
	})
	return await data.json()
}

export async function userLogin(u: User) {
	const data = await fetch('http://localhost:3000/api/users/login', {
		method: 'POST',
		body: JSON.stringify(u)
	})
	return await data.json()
}
