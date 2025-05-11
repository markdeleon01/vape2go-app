'use client'

import { use } from 'react'
import { Product } from '../lib/product'
import ProductForm from './productForm'

export default function ProductEdit({
	product
}: {
	product: Promise<Product>
}) {
	const productItem = use(product)

	return (
		<>
			<ProductForm product={productItem} />
		</>
	)
}
