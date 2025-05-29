'use client'

import { Product } from '@/app/lib/product'
import styles from './styles.productItem.module.css'
import Link from 'next/link'
import { isUserAuthenticated } from '../lib/authentication'
import { useEffect, useState } from 'react'

export default function ProductItem( {product} : {product:Product} ) {
	const editUrl = '/products/'+product.id+'/edit'
	const deleteUrl = '/products/'+product.id+'/delete'

	const [isUserLoggedIn, setUserLoggedIn] = useState(false)

	useEffect( ()=> {
		setUserLoggedIn(isUserAuthenticated())
	}, [isUserLoggedIn])

	return (
		<>
			<div className={styles.productItem}>
				<div className={styles.heading}>
					<div className={styles.name}>
						<p>
							<b>Name:</b>&nbsp;&nbsp;{product.name}
						</p>
					</div>
					{
					(isUserLoggedIn) && 
					<div className={styles.actions}>
						<div><Link data-testid='edit-product-link' href={editUrl}>Edit</Link></div>
						<div><Link data-testid='delete-product-link' href={deleteUrl}>Delete</Link></div>
					</div>
					}
				</div>
				<div>
					<p>
						<b>Brand:</b>&nbsp;&nbsp;{product.brand}
					</p>
				</div>
				<div>
					<p>
						<b>Type:</b>&nbsp;&nbsp;{product.type_product === 'P' ? 'Pod' : 'Battery'}
					</p>
				</div>
				<div>
					<p>
						<b>Flavour name:</b>&nbsp;&nbsp;{product.flavour_name}
					</p>
				</div>
				<div>
					<p>
						<b>Description:</b>&nbsp;&nbsp;{product.description}
					</p>
				</div>
				<div>
					<p>
						<b>Number of puffs:</b>&nbsp;&nbsp;{product.puffs_number}
					</p>
				</div>
				<div>
					<p>
						<b>Ingredients:</b>&nbsp;&nbsp;{product.ingredients}
					</p>
				</div>
				<div>
					<p>
						<b>Price:</b>&nbsp;&nbsp;&#8369;{product.price}
					</p>
				</div>
				<div>
					<p>
						<b>Quantity:</b>&nbsp;&nbsp;{product.quantity}
					</p>
				</div>
			</div>
		</>
	)
}
