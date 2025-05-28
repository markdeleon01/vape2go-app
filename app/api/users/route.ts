import { User, UserStore } from '@/app/lib/user'
import verifyAuthToken from '@/app/middleware'

export async function POST(request: Request) {
	console.log('POST /users')

	// verify the auth token before allowing the user to create a new user
	try {
		await verifyAuthToken(request)
	} catch (error) {
		console.error(error)
		return Response.json(
			{ error: 'Authentication failed', code: '401' },
			{ status: 401 }
		)
	}
	try {
		const data = await request.json()
		const store = new UserStore()

		const newUser: User = {
			username: data.username,
			password: data.password
		}

		const res = await store.create(newUser)
		return Response.json(res[0])
	} catch (error) {
		console.error(error)
		return Response.json(
			{ error: 'Internal Server Error', code: '500' },
			{ status: 500 }
		)
	}
}