'use client'

import ErrorComponent from '../ui/error'
import Loading from '../ui/loading'
import LoginForm from '../ui/loginForm'

import styles from './styles.admin.module.css'

import { Suspense, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import {
	getUserName,
	isUserAuthenticated,
	removeUserAuthentication
} from '../lib/authentication'

import { useRouter } from 'next/navigation'

export default function AdminHome() {
	const router = useRouter()

	const [isUserLoggedIn, setUserLoggedIn] = useState(false)
	const [loggedInUserName, setLoggedInUserName] = useState('')

	useEffect(() => {
		setUserLoggedIn(isUserAuthenticated())
		setLoggedInUserName(getUserName() as string)

		document
			.querySelector('#logoutButton')
			?.addEventListener('click', function (event) {
				event.stopPropagation()
				event.preventDefault()

				// disable the Log out button
				const logoutButton = event.target as HTMLButtonElement
				logoutButton.innerText = 'Logging out..'
				logoutButton.setAttribute('disabled', '')
				logoutButton.className =
					'text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-full text-sm px-5 py-2.5 text-center'

				// remove the user token and user name from localStorage
				removeUserAuthentication()

				// Redirect to the products page
				router.push('/products')
			})
	}, [isUserLoggedIn, router])

	return (
		<div className='grid justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col items-center sm:items-start'>
				<ErrorBoundary
					fallback={
						<ErrorComponent error={new Error('Unable to load page.')} />
					}
				>
					<Suspense fallback={<Loading />}>
						{!isUserLoggedIn && (
							<>
								<LoginForm />
							</>
						)}
						{isUserLoggedIn && (
							<>
								<div className={styles.adminUser}>
									<p>
										Welcome <b>{loggedInUserName}</b>, you are logged in!
									</p>
									<p>
										<button
											id='logoutButton'
											type='button'
											className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
										>
											Log out
										</button>
									</p>
								</div>
							</>
						)}
					</Suspense>
				</ErrorBoundary>
			</main>
		</div>
	)
}
