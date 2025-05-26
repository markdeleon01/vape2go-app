import styles from './styles.unauthorized.module.css'

export default function UnauthorizedPage() {
	return (
		<div className='grid justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col items-center sm:items-start'>
				<div className={styles.unauthorized}>
					<h1>401 - Unauthorized</h1>
					<p>Contact the web site administrator.</p>
				</div>
			</main>
		</div>
	)
}
