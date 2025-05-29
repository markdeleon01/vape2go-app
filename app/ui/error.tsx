'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import styles from './styles.error.module.css'

export default function ErrorComponent({
	error
}: {
	error: Error & { digest?: string }
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error)
	}, [error])

	return (
		<div data-testid='error' className={styles.error}>
			<div data-testid='errorMsg' className={styles.errorMsg}>
				<p>{error.message}</p>
				<p>Contact the web site administrator.</p>
			</div>
		</div>
	)
}
