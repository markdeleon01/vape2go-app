import { getProduct } from '../../../lib/service'

import ProductDelete from '@/app/ui/productDelete'
import Loading from '../../../ui/loading'

import styles from './styles.deleteProduct.module.css'

import { Suspense } from 'react'

export default async function DeleteProductPage({
	params
}: {
	params: Promise<{ id: string }>
}) {
	const { id: theProductId } = await params
	const productId: number = Number.parseInt(theProductId)
	const product = getProduct(productId)

	return (
		<div className='grid justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col items-center sm:items-start'>
				<Suspense fallback={<Loading />}>
				<>
					<div className={styles.productDelete}>
						<div className={styles.heading}>
							<p>Delete Product?</p>
						</div>
						<div className={styles.productForm}>
							<ProductDelete product={product} />
						</div>
					</div>
				</>
				</Suspense>
			</main>
		</div>
	)
}
