'use client' // Error boundaries must be Client Components

import { getProducts } from '../lib/service'

import ProductsList from '../ui/productsList'
import Loading from '../ui/loading'
import ErrorComponent from '../ui/error'

import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export default function ProductsPage() {
	const products = getProducts()

	return (
		<div className='grid justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col items-center sm:items-start'>
				<ErrorBoundary fallback={<ErrorComponent error={new Error('Error loading products.') }/> }>
					<Suspense fallback={<Loading />}>
						<ProductsList products={products} />
					</Suspense>
				</ErrorBoundary>
			</main>
		</div>
	)
}
