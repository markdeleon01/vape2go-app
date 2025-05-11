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
					<div>
						<p className={styles.heading}>Edit Product</p>
                        <ProductEdit product={product} />
					</div>
                    <div className={styles.buttonGroup}>
                        <div className={styles.leftButton}>
                            <button type='button' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Cancel</button>
                        </div>
                        <div className={styles.rightButton}>
                            <button type='button' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Update</button>
                        </div>
                    </div>
				</Suspense>
			</main>
		</div>
	)
	return
}
