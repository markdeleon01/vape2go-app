'use client'

import { useEffect, useState } from 'react'

import { User } from '../lib/user'
import { userLogin } from '../lib/service'
import { setUserAuthentication, setUserName } from '../lib/authentication'

import ErrorComponent from '../ui/error'
import styles from './styles.loginForm.module.css'

import { useRouter } from 'next/navigation'

export default function LoginForm() {
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
	}

	const enableLoginForm = () => {
		const loginButton = document.querySelector(
			'#loginButton'
		) as HTMLButtonElement
		loginButton.innerText = 'Log in'
		loginButton.removeAttribute('disabled')
		loginButton.className =
			'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
	}

	useEffect(() => {
		const showPassword = document.querySelector(
			'#showPassword'
		) as HTMLInputElement
		showPassword.addEventListener('click', ()=>{
			const pif = document.querySelector(
				'#passwordField'
			) as HTMLInputElement
			if (pif.type == 'password') {
				pif.type = 'text'
				showPassword.setAttribute('checked', '')
			} else if (pif.type == 'text') {
				pif.type = 'password'
				showPassword.removeAttribute('checked')
			}
		})

		const passwordInputField = document.querySelector(
			'#passwordField'
		) as HTMLInputElement
		passwordInputField.addEventListener('keydown', ()=>{
			const sp = document.querySelector(
				'#showPassword'
			) as HTMLInputElement
			const pif = document.querySelector(
				'#passwordField'
			) as HTMLInputElement
			setTimeout(() => {
				if (sp.checked) {
					pif.type = 'text'
				} else {
					pif.type = 'password'
				}
			}, 1)
		})

		const loginButton = document.querySelector(
			'#loginButton'
		) as HTMLButtonElement
		loginButton.addEventListener('click', function () {
			setErrorMsg('')

			disableLoginForm()

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
							const showPassword = document.querySelector(
								'#showPassword'
							) as HTMLInputElement
							showPassword.checked = false

							if (data.code === '401') {
								throw new Error('Invalid credentials. Please try again.')
							} else {
								throw new Error('Error logging in.')
							}
						} else {
							setUserAuthentication(data.token)
							setUserName(data.user.username)

							// Redirect to the products page
							router.push('/products')
						}
					})
					.catch((error) => {
						console.error('Error logging in:', error)

						enableLoginForm()

						// Display error message to the user
						setErrorMsg(error.message)
					})
			}, 100)
		})
	}, [router])

	return (
		<>
			<div className={styles.adminLogin}>
				<form id='loginForm' name='loginForm' className={styles.loginForm}>
					<div className={styles.row}>
						<div className={styles.inputField}>
							<input
								type='text'
								id='usernameField'
								name='usernameField'
								placeholder='Username'
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
								alt='Show Password'
								title='Show Password'
								placeholder='Show Password'
							/>
							<label className={styles.showPasswordLabel}>Show Password</label>
						</div>
					</div>
					<div className={styles.row}>
						<div>
							<button
								id='loginButton'
								type='submit'
								className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
							>
								Log in
							</button>
						</div>
					</div>
				</form>
				{errorMsg && <ErrorComponent error={new Error(errorMsg)} />}
			</div>
		</>
	)
}
