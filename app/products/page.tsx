'use client' // Error boundaries must be Client Components

import { getProducts } from '@/app/lib/service'

import ProductsList from '@/app/ui/productsList'
import Loading from '@/app/ui/loading'
import ErrorComponent from '@/app/ui/error'

import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export default function ProductsPage() {
	const products = getProducts()

	return (
		<div className='grid justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col items-center sm:items-start'>
				<ErrorBoundary fallback={<ErrorComponent error={new Error('Unable to load page.') }/> }>
					<Suspense fallback={<Loading />}>
						<ProductsList products={products} />
					</Suspense>
				</ErrorBoundary>
			</main>
		</div>
	)
}
