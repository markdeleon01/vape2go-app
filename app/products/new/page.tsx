import Loading from '../../ui/loading'

import { Suspense } from 'react'

export default async function AddProductPage() {

	return (
		<div className='grid justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col items-center sm:items-start'>
				<Suspense fallback={<Loading />}>
					<div>
						<p>Add Product</p>
					</div>
				</Suspense>
			</main>
		</div>
	)
	return
}
