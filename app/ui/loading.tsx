'use client'

import styles from './styles.loading.module.css'
import Image from 'next/image'

export default function Loading() {
	return (
		<div className='grid justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col items-center sm:items-start'>
				<Image
					className='dark:invert'
					src='/vape2go_logo.jpg'
					alt='Vape To Go logo'
					width={150}
					height={150}
					priority
				/>
                <p className={styles.loading}>Loading...</p>
			</main>
		</div>
	)
}
