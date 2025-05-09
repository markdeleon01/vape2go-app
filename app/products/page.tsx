import { getProducts } from '../lib/service'

import ProductsList from '../ui/productsList'
import Loading from '../ui/loading'

import { Suspense } from 'react'

export default function ProductsPage() {
	const products = getProducts()

	return (
		<div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
				<Suspense fallback={<Loading />}>
					<ProductsList products={products} />
				</Suspense>
			</main>
		</div>
	)
}
