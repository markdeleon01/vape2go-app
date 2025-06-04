'use client' // Error boundaries must be Client Components

import { getProducts } from '@/app/lib/service'

import Loading from '@/app/ui/loading'
import ErrorComponent from '@/app/ui/error'

import { Suspense, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import dynamic from 'next/dynamic'

const ProductsList = dynamic(
	() => import('@/app/ui/productsList'),
	{ ssr: false }
)

export default function ProductsPage() {
	const [isLoading, setIsLoading] = useState(true)

	const products = getProducts()
	
	useEffect(() => {
		// Check if products are loaded
		products.then(() => {
			setIsLoading(false)
		}).catch((error) => {
			console.error('Error loading products:', error)
			setIsLoading(false)
			throw new Error('Error loading products')
		})
	}, [products])

	return (
		<div className='grid justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col items-center sm:items-start'>
				<ErrorBoundary fallback={<ErrorComponent error={new Error('Unable to load page.') }/> }>
					<Suspense fallback={<Loading />}>
						{ isLoading && <Loading />}
						{ !isLoading && <ProductsList products={products} />}
						
					</Suspense>
				</ErrorBoundary>
			</main>
		</div>
	)
}
