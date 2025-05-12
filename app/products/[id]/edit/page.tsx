import { getProduct } from '../../../lib/service'
import { updateProductDetails } from '../../../lib/actions'

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
					<div className={styles.heading}>
						<p>Edit Product</p>
					</div>
					<form action={updateProductDetails}>
						<input type='hidden' name='productId' value={productId} />
						<div>
							<ProductEdit product={product} />
						</div>
						<div className={styles.buttonGroup}>
							<div className={styles.leftButton}>
								<button
									type='button'
									className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
								>
									Cancel
								</button>
							</div>
							<div className={styles.rightButton}>
								<button
                                    id='updateButton'
									type='submit'
									className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
								>
									Update
								</button>
							</div>
						</div>
					</form>
				</Suspense>
			</main>
		</div>
	)
	return
}
