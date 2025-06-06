'use client' // Error boundaries must be Client Components

import { getProduct } from '@/app/lib/service'

import ProductDelete from '@/app/ui/productDelete'
import Loading from '@/app/ui/loading'
import ErrorComponent from '@/app/ui/error'

import styles from './styles.deleteProduct.module.css'

import { Suspense, useEffect} from 'react'
import { use } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { isUserAuthenticated } from '@/app/lib/authentication'
import { unauthorized } from 'next/navigation'

export default function DeleteProductPage({
	params
}: {
	params: Promise<{ id: string }>
}) {
	useEffect(() => {
		// check if user is authenticated to delete a product
		if (!isUserAuthenticated()) {
			console.error('Error loading page:  Not authorized')
			unauthorized()
		}
	}, [])

	const { id: theProductId } = use(params)
	const productId: number = Number.parseInt(theProductId)
	const product = getProduct(productId)

	return (
		<div className='grid justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col items-center sm:items-start'>
				<ErrorBoundary fallback={<ErrorComponent error={new Error('Unable to load page.') }/> }>
					<Suspense fallback={<Loading />}>
					<>
						<div className={styles.productDelete}>
							<div className={styles.heading} id='deleteProductHeading'>
								<p>Delete Product</p>
							</div>
							<div className={styles.productForm}>
								<ProductDelete product={product} />
							</div>
						</div>
					</>
					</Suspense>
				</ErrorBoundary>
			</main>
		</div>
	)
}
