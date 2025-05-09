'use client'

import Link from 'next/link'

export default function NavBar() {

	return (
        <nav>
		<div>
			<Link data-testid='home-link' href='/'>
				Home
			</Link>
			&nbsp;|&nbsp;
			<Link data-testid='products-link' href='/products'>
				Products
			</Link>
		</div>
        </nav>
	)
}
