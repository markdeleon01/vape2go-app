'use client'

import { use } from 'react'
import { Product } from '@/app/lib/product'
import ProductItem from '@/app/ui/productItem'
import styles from './styles.productList.module.css'
import Link from 'next/link'

export default function ProductsList({
	products
}: {
	products: Promise<Product[]>
}) {
	const allProducts = use(products)

	return (
		<>
			<div className={styles.addProduct}>
				<p><Link data-testid='add-product-link' href='/products/new'>+ Add new product</Link></p>
			</div>
			<div className={styles.productList}>
				<ul>
					{allProducts.map((product) => (
						<li key={product.id}><ProductItem product={product} /></li>
					))}
				</ul>
			</div>
		</>
	)
}
