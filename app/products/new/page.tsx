'use client'

import ProductAdd from '@/app/ui/productAdd'
import Loading from '../../ui/loading'
import styles from './styles.addProduct.module.css'

import { Suspense } from 'react'

export default function AddProductPage() {

	return (
		<div className='grid justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col items-center sm:items-start'>
				<Suspense fallback={<Loading />}>
				<>
					<div className={styles.heading}>
						<p>Add Product</p>
					</div>
					<ProductAdd />
				</>
				</Suspense>
			</main>
		</div>
	)
}
