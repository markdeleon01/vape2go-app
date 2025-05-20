'use client'

import { useEffect, useState } from 'react'

import { Product } from '../lib/product'
import { addProduct } from '../lib/service'

import ProductForm from './productForm'

import { useRouter } from 'next/navigation'
import ErrorComponent from './error'

export default function ProductAdd() {
	const [errorMsg, setErrorMsg] = useState('')

	const router = useRouter()

	const productItem: Product = {
		name: undefined,
		brand: undefined,
		price: undefined,
		description: undefined,
		image_blob: undefined,
		flavour_name: undefined,
		puffs_number: undefined,
		ingredients: undefined,
		type_product: undefined,
		quantity: undefined
	}

	const disableForm = () => {
		const saveButton = document.querySelector('#saveButton') as HTMLButtonElement
		saveButton.innerText = 'Saving...'
		saveButton.setAttribute('disabled', '')
		saveButton.className =
			'text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-full text-sm px-5 py-2.5 text-center'

		// Disable all form controls
		const productForm = document.querySelector('#productForm') as HTMLFormElement
		const inputs = productForm.elements
		// Iterate over the form controls
		for (let i = 0; i < inputs.length; i++) {
			// Disable all form input fields
			const e = inputs[i]
			if (e instanceof HTMLInputElement) {
				inputs[i].setAttribute('disabled', '')
				const element = inputs[i] as HTMLElement
				element.style.backgroundColor = 'lightgrey'
			}
		}
	}

	const enableForm = () => {
		const saveButton = document.querySelector('#saveButton') as HTMLButtonElement
		saveButton.innerText = 'Save'
		saveButton.removeAttribute('disabled')
		saveButton.className =
			'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'

		// Enable all form controls
		const productForm = document.querySelector('#productForm') as HTMLFormElement
		const inputs = productForm.elements
		// Iterate over the form controls
		for (let i = 0; i < inputs.length; i++) {
			// Enable all form input fields
			const e = inputs[i]
			if (e instanceof HTMLInputElement) {
				inputs[i].removeAttribute('disabled')
				const element = inputs[i] as HTMLElement
				element.style.backgroundColor = 'white'
			}
		}
	}

	useEffect(() => {
		document.querySelector('#saveButton')?.addEventListener('click', function (event) {
			event.stopPropagation()
			event.preventDefault()

			setTimeout(() => {
				disableForm()
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


			let isValid = true
			setTimeout(() => {
				// validate product details
				if (productName.value === undefined || productName.value.trim() === '') {
					productName.setAttribute('style', 'color: red')
					isValid = false
				}
				if (productBrand.value === undefined || productBrand.value.trim() === '') {
					productBrand.setAttribute('style', 'color: red')
					isValid = false
				}
				let pPrice = 0
				console.log('productPrice.value=' + productPrice.value)
				if (productPrice.value != undefined) {
					pPrice = Number.parseInt(productPrice.value)
					console.log('pPrice=' + pPrice)
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
				console.log('productPuffs.value=' + productPuffs.value)
				if (productPuffs.value != undefined) {
					pPuffs = Number.parseInt(productPuffs.value)
					console.log('pPuffs=' + pPuffs)
					if (Number.isNaN(pPuffs)) {
						productPuffs.setAttribute('style', 'color: red')
						productPuffs.value = ''
						isValid = false
					}
				}
				let pQuantity = 0
				console.log('productQuantity.value=' + productQuantity.value)
				if (productQuantity.value != undefined) {
					pQuantity = Number.parseInt(productQuantity.value)
					console.log('pQuantity=' + pQuantity)
					if (Number.isNaN(pQuantity)) {
						productQuantity.setAttribute('style', 'color: red')
						productQuantity.value = ''
						isValid = false
					}
				}

				if (!isValid) {
					setTimeout(() => {
						enableForm()
						return false
					}, 200)
				} else {
					// if valid, continue
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

					addProduct(p).then((data) => {
						if (data.error) {
							throw new Error('Error adding product.')
						} else {	
							// Redirect to the products page
							router.push('/products')
						}
					}).catch((error) => {
						console.error('Error adding product:', error)
	
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
