'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getUserName, removeUserAuthentication } from '../lib/authentication'

import styles from './styles.userGreeting.module.css'


export default function UserGreeting() {
	const router = useRouter()

	const [loggedInUserName, setLoggedInUserName] = useState('')

	useEffect(() => {
        setLoggedInUserName(getUserName() as string)
        
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
	)
}
