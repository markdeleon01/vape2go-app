import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { NextResponse } from 'next/server'

// Middleware allows you to run code before a request is completed
const verifyAuthToken = async (request: Request) => {
	console.log('verifyAuthToken middleware')
	try {
		const requestHeaders = new Headers(request.headers)
		const authorizationHeader = requestHeaders.get('authorization') as string
		const token = authorizationHeader.split(' ')[1]
		const { TOKEN_SECRET } = process.env

		jwt.verify(token, TOKEN_SECRET as Secret) as JwtPayload

		return NextResponse.next()
	} catch (error) {
		console.error('Authentication failed in verifyAuthToken: ' + error)
		throw new Error('Authentication failed in verifyAuthToken')
	}
}

export const config = {
	// should cover CRUD paths for products
	// '/products/new', '/products/1', '/products/1/edit', '/products/1/delete'
	matcher: '/products/:path*'
}

export default verifyAuthToken
