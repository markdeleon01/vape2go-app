'use client'

import ProductAdd from '@/app/ui/productAdd'
import Loading from '@/app/ui/loading'
import styles from './styles.addProduct.module.css'

import { Suspense } from 'react'
import ErrorComponent from '@/app/ui/error'
import { ErrorBoundary } from 'react-error-boundary'

export default function AddProductPage() {

	return (
		<div className='grid justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col items-center sm:items-start'>
				<ErrorBoundary fallback={<ErrorComponent error={new Error('Unable to load page.') }/> }>
					<Suspense fallback={<Loading />}>
					<>
						<div className={styles.heading} id='addProductHeading'>
							<p>Add Product</p>
						</div>
						<div className={styles.productForm}>
							<ProductAdd />
						</div>
					</>
					</Suspense>
				</ErrorBoundary>
			</main>
		</div>
	)
}
