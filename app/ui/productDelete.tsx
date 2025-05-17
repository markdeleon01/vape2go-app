'use client'

import { use } from 'react'
import { useEffect } from 'react'

import { Product } from '../lib/product'
import { deleteProduct } from '../lib/service'

import styles from './styles.productDetail.module.css'

import { useRouter } from 'next/navigation'

export default function ProductDelete({
	product
}: {
	product: Promise<Product>
}) {
	const router = useRouter()
	const productItem = use(product)

	useEffect(() => {
		document
			.querySelector('#deleteButton')
			?.addEventListener('click', (event) => {
				event.preventDefault()
				event.stopPropagation()

				const deleteButton = event.target as HTMLButtonElement
				deleteButton.innerText = 'Deleting...'
				deleteButton.setAttribute('disabled', 'true')
				deleteButton.className =
					'text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-full text-sm px-5 py-2.5 text-center'

				let pId = 0
				if (productItem.id != undefined) {
					pId = productItem.id as number
				}

				deleteProduct(pId)
					.then(() => {
						console.log('Product deleted successfully::pId=' + pId)

						// Redirect to the products page
						router.push('/products')
					})
					.catch((error) => {
						console.error('Error deleting product:', error)
					})
			})
	}, [])

	return (
		<>
			<div className={styles.productItem}>
				<div className={styles.name}>
					<p>
						<b>Name:</b>&nbsp;&nbsp;{productItem.name}
					</p>
				</div>
				<div>
					<p>
						<b>Brand:</b>&nbsp;&nbsp;{productItem.brand}
					</p>
				</div>
				<div>
					<p>
						<b>Type:</b>&nbsp;&nbsp;
						{productItem.type_product === 'P' ? 'Pod' : 'Battery'}
					</p>
				</div>
				<div>
					<p>
						<b>Flavour name:</b>&nbsp;&nbsp;{productItem.flavour_name}
					</p>
				</div>
				<div>
					<p>
						<b>Description:</b>&nbsp;&nbsp;{productItem.description}
					</p>
				</div>
				<div>
					<p>
						<b>Number of puffs:</b>&nbsp;&nbsp;{productItem.puffs_number}
					</p>
				</div>
				<div>
					<p>
						<b>Ingredients:</b>&nbsp;&nbsp;{productItem.ingredients}
					</p>
				</div>
				<div>
					<p>
						<b>Price:</b>&nbsp;&nbsp;&#8369;{productItem.price}
					</p>
				</div>
				<div>
					<p>
						<b>Quantity:</b>&nbsp;&nbsp;{productItem.quantity}
					</p>
				</div>
			</div>
			<div className={styles.buttonGroup}>
				<div className={styles.rightButton}>
					<button
						id='deleteButton'
						type='button'
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
					>
						Delete
					</button>
				</div>
			</div>
		</>
	)
}
