'use client' // Error boundaries must be Client Components

import { getProduct } from '../../../lib/service'

import ProductEdit from '@/app/ui/productEdit'
import Loading from '../../../ui/loading'
import ErrorComponent from '../../../ui/error'

import styles from './styles.editProduct.module.css'

import { Suspense } from 'react'
import { use } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export default function EditProductPage({
	params
}: {
	params: Promise<{ id: string }>
}) {

	const { id: theProductId } = use(params)
	const productId: number = Number.parseInt(theProductId)
	const product = getProduct(productId)

	return (
		<div className='grid justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col items-center sm:items-start'>
			<ErrorBoundary fallback={<ErrorComponent error={new Error('Error loading product.') }/> }>
				<Suspense fallback={<Loading />}>
				<>
					<div className={styles.heading}>
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
