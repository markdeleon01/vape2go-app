'use client'

import { use } from 'react'
import { useEffect, useState } from 'react'

import { Product } from '../lib/product'
import { updateProduct } from '../lib/service'
import { disableProductForm, enableProductForm, setupFocusInputFields } from '../lib/ui'

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
		setupFocusInputFields()

		document.querySelector('#saveButton')?.addEventListener('click', function (event) {
			event.stopPropagation()
			event.preventDefault()

			setTimeout(() => {
				disableProductForm()
			}, 200)

			const productName = document.querySelector('#productName') as HTMLInputElement
			const productBrand = document.querySelector('#productBrand') as HTMLInputElement
			const productPrice = document.querySelector('#productPrice') as HTMLInputElement

			const productDescription = document.querySelector('#productDescription') as HTMLInputElement
			const productFlavour = document.querySelector('#productFlavour') as HTMLInputElement
			const productPuffs = document.querySelector('#productPuffsNumber') as HTMLInputElement

			const productIngredients = document.querySelector('#productIngredients') as HTMLInputElement
			const productType = document.querySelector('#productType') as HTMLSelectElement
	
			const productQuantity = document.querySelector('#productQuantity') as HTMLInputElement
	

			setTimeout(() => {
				// validate product details
				let isValid = true
				if (productName.value === undefined || productName.value.trim() === '') {
					productName.setAttribute('style', 'color: red')
					isValid = false
				}
				if (productBrand.value === undefined || productBrand.value.trim() === '') {
					productBrand.setAttribute('style', 'color: red')
					isValid = false
				}
				let pPrice = 0
				if (productPrice.value != undefined) {
					pPrice = Number.parseInt(productPrice.value)
					if (Number.isNaN(pPrice)) {
						productPrice.setAttribute('style', 'color: red')
						productPrice.value = ''
						isValid = false
					}
				}
				if (productFlavour.value === undefined || productFlavour.value.trim() === '') {
					productFlavour.setAttribute('style', 'color: red')
					isValid = false
				}
				let pPuffs = 0
				if (productPuffs.value != undefined) {
					pPuffs = Number.parseInt(productPuffs.value)
					if (Number.isNaN(pPuffs)) {
						productPuffs.setAttribute('style', 'color: red')
						productPuffs.value = ''
						isValid = false
					}
				}
				let pQuantity = 0
				if (productQuantity.value != undefined) {
					pQuantity = Number.parseInt(productQuantity.value)
					if (Number.isNaN(pQuantity)) {
						productQuantity.setAttribute('style', 'color: red')
						productQuantity.value = ''
						isValid = false
					}
				}

				if (!isValid) {
					setTimeout(() => {
						enableProductForm()
						return false
					}, 200)
				} else {
					// if valid, continue
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

					updateProduct(pId, p).then((data) => {
						if (data.error) {
							throw new Error('Error updating product.')
						} else {	
							// Redirect to the products page
							router.push('/products')
						}
					}).catch((error) => {
						console.error('Error updating product:', error)

						// Display error message to the user
						setErrorMsg(error.message)
					})
	
					return true
				}
			}, 200)
		})
	}, [router])

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
