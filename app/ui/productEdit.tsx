'use client'

import { use } from 'react'
import { useEffect, useState } from 'react'

import { Product } from '../lib/product'
import { updateProduct } from '../lib/service'

import ProductForm from './productForm'

import { useRouter } from 'next/navigation'
import ErrorComponent from './error'

export default function ProductEdit({
	product
}: {
	product: Promise<Product>
}) {
	const [errorMsg, setErrorMsg] = useState('')

	const router = useRouter()
	const productItem = use(product)

	if (!productItem.id) {
		throw new Error('Error loading product')
	}

	useEffect(() => {
		document.querySelector('#saveButton')
			?.addEventListener('click', (event) => {
				event.preventDefault()
				event.stopPropagation()
				
				const saveButton = event.target as HTMLButtonElement
				saveButton.innerText = 'Saving...'
				saveButton.setAttribute('disabled', 'true')
				saveButton.className =
					'text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-full text-sm px-5 py-2.5 text-center'

				// Disable all form controls
				const productForm = document.querySelector('#productForm') as HTMLFormElement
				const inputs = productForm.elements
				// Iterate over the form controls
				for (let i = 0; i < inputs.length; i++) {
					// Disable all form controls
					inputs[i].setAttribute('disabled', '')
					const element = inputs[i] as HTMLElement
					element.style.backgroundColor = 'lightgrey'
				}

				const productName = document.querySelector('#productName') as HTMLInputElement
				const productBrand = document.querySelector('#productBrand') as HTMLInputElement
				const productPrice = document.querySelector('#productPrice') as HTMLInputElement
				let pPrice = 0
				if (productPrice != undefined) {
					pPrice = Number.parseInt(productPrice.value)
				}
				const productDescription = document.querySelector('#productDescription') as HTMLInputElement
				const productFlavour = document.querySelector('#productFlavour') as HTMLInputElement
				const productPuffs = document.querySelector('#productPuffsNumber') as HTMLInputElement
				let pPuffs = 0
				if (productPuffs != undefined) {
					pPuffs = Number.parseInt(productPuffs.value)
				}
				const productIngredients = document.querySelector('#productIngredients') as HTMLInputElement
				const productType = document.querySelector('#productType') as HTMLSelectElement
		
				const productQuantity = document.querySelector('#productQuantity') as HTMLInputElement
				let pQuantity = 0
				if (productQuantity != undefined) {
					pQuantity = Number.parseInt(productQuantity.value)
				}
		
				const productId = document.querySelector('#productId') as HTMLInputElement
				let pId = 0
				if (productId.value != null) {
					pId = Number.parseInt(productId.value)
				}
		
				const p: Product = {
					name: productName.value,
					brand: productBrand.value,
					price: pPrice,
					description: productDescription.value,
					image_blob: undefined,
					flavour_name: productFlavour.value,
					puffs_number: pPuffs,
					ingredients: productIngredients.value,
					type_product: productType.value,
					quantity: pQuantity
				}
		
				// validate product details

				updateProduct(pId, p).then(() => {

					if (p.id) {	
						// Redirect to the products page
						router.push('/products')
					} else {
						throw new Error('Error updating product.')
					}

				}).catch((error) => {
					console.error('Error updating product:', error)

					// Display error message to the user
					setErrorMsg(error.message)
				})
			})
	}, [])

	return (
		<>
			<form id='productForm' name='productForm'>
				<ProductForm product={productItem} />
			</form>
			{ errorMsg && 
				<ErrorComponent error={new Error(errorMsg)}/>
			}
		</>
	)
}
