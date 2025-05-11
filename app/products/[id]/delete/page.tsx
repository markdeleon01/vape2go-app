import Loading from '../../../ui/loading'

import { Suspense } from 'react'

export default async function DeleteProductPage({
	params
}: {
	params: Promise<{ id: string }>
}) {
	const { id: productId } = await params

	return (
		<div className='grid justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col items-center sm:items-start'>
				<Suspense fallback={<Loading />}>
					<div>
						<p>Delete Product: {productId}</p>
					</div>
				</Suspense>
			</main>
		</div>
	)
	return
}
