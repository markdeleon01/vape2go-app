'use client'

import { use } from 'react'
import { Product } from '../lib/product'
import ProductItem from './productItem'
import Link from 'next/link'

export default function ProductsList({
	products
}: {
	products: Promise<Product[]>
}) {
	const allProducts = use(products)

	return (
		<>
			<div>
				<p><Link data-testid='add-product-link' href='#'>+ Add new product</Link></p>
			</div>
			<div>
				<ul>
					{allProducts.map((product) => (
						<li key={product.id}><ProductItem product={product} /></li>
					))}
				</ul>
			</div>
		</>
	)
}
