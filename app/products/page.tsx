import { getProducts } from '../lib/service'

import ProductsList from '../ui/productsList'
import Loading from '../ui/loading'

import { Suspense } from 'react'

export default function ProductsPage() {
	const products = getProducts()

	return (
		<div className='grid justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col items-center sm:items-start'>
				<Suspense fallback={<Loading />}>
					<ProductsList products={products} />
				</Suspense>
			</main>
		</div>
	)
}
