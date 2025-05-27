'use client'

import ErrorComponent from '../ui/error'
import Loading from '../ui/loading'

import styles from './styles.admin.module.css'

import { Suspense, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import {
	getUserName,
	isUserAuthenticated,
	removeUserAuthentication,
	setUserAuthentication,
	setUserName
} from '../lib/authentication'

import { useRouter } from 'next/navigation'
import { User } from '../lib/user'
import { userLogin } from '../lib/service'

export default function AdminHome() {
	const [errorMsg, setErrorMsg] = useState('')
	const router = useRouter()

	const user: User = {
		username: '',
		password: ''
	}

	const disableLoginForm = () => {
		const loginButton = document.querySelector(
			'#loginButton'
		) as HTMLButtonElement
		loginButton.innerText = 'Logging in...'
		loginButton.setAttribute('disabled', '')
		loginButton.className =
			'text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-full text-sm px-5 py-2.5 text-center'

		const loginForm = document.querySelector('#loginForm') as HTMLFormElement
		const inputs = loginForm.elements
		for (let i = 0; i < inputs.length; i++) {
			// Disable all form input fields
			const e = inputs[i]
			if (e instanceof HTMLInputElement) {
				e.setAttribute('disabled', '')
				e.style.backgroundColor = 'lightgrey'
			}
		}
	}

	const enableLoginForm = () => {
		const loginButton = document.querySelector(
			'#loginButton'
		) as HTMLButtonElement
		loginButton.innerText = 'Log in'
		loginButton.removeAttribute('disabled')
		loginButton.className =
			'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'

		setTimeout(() => {
			const showPassword = document.querySelector(
				'#showPassword'
			) as HTMLInputElement
			showPassword.removeAttribute('checked')
		}, 200)

		setTimeout(() => {
			const loginForm = document.querySelector('#loginForm') as HTMLFormElement
			const inputs = loginForm.elements
			for (let i = 0; i < inputs.length; i++) {
				// Enable all form input fields
				const e = inputs[i]
				if (e instanceof HTMLInputElement) {
					e.removeAttribute('disabled')
					e.style.backgroundColor = 'white'
				}
			}
		}, 200)
	}

	const [isUserLoggedIn, setUserLoggedIn] = useState(false)
	const [loggedInUserName, setLoggedInUserName] = useState('')

	useEffect(() => {
		setUserLoggedIn(isUserAuthenticated())
		setLoggedInUserName(getUserName() as string)

		const showPassword = document.querySelector(
			'#showPassword'
		) as HTMLInputElement
		showPassword.addEventListener('click', () => {
			const passwordInputField = document.querySelector(
				'#passwordField'
			) as HTMLInputElement
			if (passwordInputField.type === 'password') {
				passwordInputField.type = 'text'
				showPassword.setAttribute('checked', '')
			} else if (passwordInputField.type === 'text') {
				passwordInputField.type = 'password'
				showPassword.removeAttribute('checked')
			}
		})

		const loginButton = document.querySelector(
			'#loginButton'
		) as HTMLButtonElement
		loginButton.addEventListener('click', () => {
			setTimeout(() => {
				disableLoginForm()
			}, 200)

			const user: User = {
				username: (document.querySelector('#usernameField') as HTMLInputElement)
					.value,
				password: (document.querySelector('#passwordField') as HTMLInputElement)
					.value
			}

			setTimeout(() => {
				userLogin(user)
					.then(async (data) => {
						if (data.error) {
							throw new Error('Error logging in.')
						} else {
							setUserAuthentication(data.token)
							setUserName(data.user.username)

							// Redirect to the products page
							router.push('/products')
						}
					})
					.catch((error) => {
						setTimeout(() => {
							console.error('Error logging in:', error)

							enableLoginForm()

							// Display error message to the user
							setErrorMsg(error.message)
						}, 200)
					})

				return true
			}, 200)
		})

		const logoutButton = document.querySelector(
			'#logoutButton'
		) as HTMLButtonElement
		logoutButton.addEventListener('click', () => {
			// disable the Log out button
			logoutButton.innerText = 'Logging out..'
			logoutButton.setAttribute('disabled', '')
			logoutButton.className =
				'text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-full text-sm px-5 py-2.5 text-center'

			// remove the user token and user name from localStorage
			removeUserAuthentication()

			// Redirect to the products page
			router.push('/products')
		})
	}, [router])

	return (
		<div className='grid justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col items-center sm:items-start'>
				<ErrorBoundary
					fallback={
						<ErrorComponent error={new Error('Unable to load page.')} />
					}
				>
					<Suspense fallback={<Loading />}>
						<>
							<div className={styles.adminLogin}>
								<form
									id='loginForm'
									name='loginForm'
									className={styles.loginForm}
								>
									<div className={styles.row}>
										<div className={styles.inputField}>
											<input
												type='text'
												id='usernameField'
												name='usernameField'
												placeholder='User name'
												alt='User name'
												maxLength={255}
												size={20}
												defaultValue={user.username}
											/>
										</div>
									</div>
									<div className={styles.row}>
										<div className={styles.inputField}>
											<input
												type='password'
												id='passwordField'
												name='password'
												placeholder='Password'
												alt='Password'
												maxLength={255}
												size={20}
												defaultValue={user.password}
											/>
										</div>
									</div>
									<div className={styles.row}>
										<div>
											<input
												type='checkbox'
												id='showPassword'
												name='showPassword'
												value='Show Password'
												alt='Show Password'
												title='Show Password'
												placeholder='Show Password'
											/>
											<label className={styles.showPasswordLabel}>
												Show Password
											</label>
										</div>
									</div>
									<div className={styles.row}>
										<div>
											<button
												id='loginButton'
												type='button'
												className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
											>
												Log in
											</button>
										</div>
									</div>
								</form>
								{errorMsg && <ErrorComponent error={new Error(errorMsg)} />}
							</div>
							<div className={styles.adminUser}>
								<p>
									Welcome <b>{loggedInUserName}</b>, you are logged in!
								</p>
								<p className={styles.logoutButton}>
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
					</Suspense>
				</ErrorBoundary>
			</main>
		</div>
	)
}
