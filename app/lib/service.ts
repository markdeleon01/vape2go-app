export async function getProducts() {
    const data = await fetch('http://localhost:3000/api/products')
    return await data.json()
}