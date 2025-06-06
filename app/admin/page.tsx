'use client'

import dynamic from 'next/dynamic'
import ErrorComponent from '../ui/error'
import Loading from '../ui/loading'

import { Suspense, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import {
	isUserAuthenticated,
} from '../lib/authentication'

import { useRouter } from 'next/navigation'

const LoginForm = dynamic(
	() => import('@/app/ui/loginForm'),
	{ ssr: false }
  )

const UserGreeting = dynamic(
	() => import('@/app/ui/userGreeting'),
	{ ssr: false }
  )

export default function AdminHome() {

	const router = useRouter()

	const [isUserLoggedIn, setUserLoggedIn] = useState('')

	useEffect(() => {
		setUserLoggedIn(isUserAuthenticated() ? 'true' : 'false')
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
						{isUserLoggedIn === '' && (
							<Loading />
						)}
						{isUserLoggedIn === 'false' && (
							<LoginForm />
						)}
						{isUserLoggedIn === 'true' && (
							<UserGreeting />
						)}
						</>
					</Suspense>
				</ErrorBoundary>
			</main>
		</div>
	)
}
