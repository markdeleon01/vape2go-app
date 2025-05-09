'use client'

import Image from 'next/image'

export default function Loading() {
	return (
		<div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
				<Image
					className='dark:invert'
					src='/vape2go_logo.jpg'
					alt='Vape To Go logo'
					width={150}
					height={150}
					priority
				/>
			</main>
			<footer className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
				<div className='row-start-1 flex gap-[24px] flex-wrap items-center justify-center'>
					<p className='flex items-center justify-center'>Loading...</p>
				</div>
			</footer>
		</div>
	)
}
