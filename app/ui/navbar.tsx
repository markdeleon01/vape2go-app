'use client'

import Link from 'next/link'
import styles from './styles.navbar.module.css'

export default function NavBar() {

	return (
        <nav>
			<div className={styles.nav}>
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
