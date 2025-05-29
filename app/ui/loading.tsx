'use client'

import styles from './styles.loading.module.css'
import Image from 'next/image'

export default function Loading() {
	return (
		<div className={styles.loadingBlock}>
			<div className={styles.loadingImage}>
				<Image
					className='dark:invert'
					src='/vape2go_logo.jpg'
					alt='Vape To Go logo'
					width={150}
					height={150}
					priority
				/>
			</div>
			<p className={styles.loadingMsg}>Loading...</p>
		</div>
	)
}
