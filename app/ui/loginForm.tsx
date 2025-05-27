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

	useEffect(() => {
		const showPassword = document.querySelector(
			'#showPassword'
		) as HTMLInputElement
		showPassword.addEventListener('click', ()=>{
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
		loginButton.addEventListener('click', function (event) {
				event.stopPropagation()
				event.preventDefault()

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
	})

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
							<label className={styles.showPasswordLabel}>Show Password</label>
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
		</>
	)
}
