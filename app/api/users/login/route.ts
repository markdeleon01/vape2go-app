import { User, UserStore } from '@/app/lib/user'
import jwt, { Secret } from 'jsonwebtoken'

// the handler function to authenticate/login a user;
// a JWT for the user is returned upon successful authentication/login
export async function POST(request: Request) {
    console.log('POST /users/login')

	try {
		const data = await request.json()
        const store = new UserStore()

        const user: User = {
            username: data.username,
            password: data.password
        }

        const theUser = await store.authenticate(user)
        if (theUser) {
            return Response.json({ user: theUser, token: createToken(theUser as User) })
        } else {
            return Response.json({ error: 'Not authorized' }, { status: 401 })
        }
	} catch (error) {
		console.error(error)
		return Response.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}

// helper method create a JWT (JSON Web Token)
const createToken = (theUser: User): string => {
    const { TOKEN_SECRET } = process.env

    // theUser at this point contains the encyrpted password value;
    // set the payload to the user's id, username for the JWT
    return jwt.sign(
      {
        user: {
          id: theUser.id,
          username: theUser.username
        }
      },
      TOKEN_SECRET as Secret
    )
  }
  