import { getProduct } from '../../../lib/service'

import ProductEdit from '@/app/ui/productEdit'
import Loading from '../../../ui/loading'

import styles from './styles.editProduct.module.css'

import { Suspense } from 'react'

export default async function EditProductPage({
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
					<div className={styles.heading}>
						<p>Edit Product</p>
					</div>
					<div className={styles.productForm}>
						<ProductEdit product={product} />
					</div>
				</>
				</Suspense>
			</main>
		</div>
	)
}
