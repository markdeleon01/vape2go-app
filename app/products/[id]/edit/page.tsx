'use client' // Error boundaries must be Client Components

import { getProduct } from '@/app/lib/service'

import ProductEdit from '@/app/ui/productEdit'
import Loading from '@/app/ui/loading'
import ErrorComponent from '@/app/ui/error'

import styles from './styles.editProduct.module.css'

import { Suspense } from 'react'
import { use } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { isUserAuthenticated } from '@/app/lib/authentication'
import { unauthorized } from 'next/navigation'

export default function EditProductPage({
	params
}: {
	params: Promise<{ id: string }>
}) {

	// check if user is authenticated to update a new product
	if (!isUserAuthenticated()) {
		console.error('Error loading page:  Not authorized')
		unauthorized()
	}

	const { id: theProductId } = use(params)
	const productId: number = Number.parseInt(theProductId)
	const product = getProduct(productId)

	return (
		<div className='grid justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col items-center sm:items-start'>
			<ErrorBoundary fallback={<ErrorComponent error={new Error('Unable to load page.') }/> }>
				<Suspense fallback={<Loading />}>
				<>
					<div className={styles.heading} id='addProductHeading'>
						<p>Edit Product</p>
					</div>
					<div className={styles.productForm}>
						<ProductEdit product={product} />
					</div>
				</>
				</Suspense>
			</ErrorBoundary>
			</main>
		</div>
	)
}
