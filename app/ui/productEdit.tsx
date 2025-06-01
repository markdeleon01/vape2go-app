'use client'

import { use } from 'react'
import { useEffect, useState } from 'react'

import { Product } from '@/app/lib/product'
import { updateProduct } from '@/app/lib/service'
import {
	disableProductForm,
	enableProductForm,
	setupFocusInputFields
} from '@/app/lib/ui'

import styles from './styles.productForm.module.css'
import ErrorComponent from '@/app/ui/error'

import { useRouter } from 'next/navigation'

export default function ProductEdit({
	product
}: {
	product: Promise<Product>
}) {
	const [thumbNailFile, setThumbNailFile] = useState<File | null>(null)
	const [errorMsg, setErrorMsg] = useState('')
	const router = useRouter()

	const handleThumbNailFileClick = () => {
		const thumbNailImageFileUploadInput = document.querySelector(
			'#thumbNailImageFileUploadInput'
		) as HTMLInputElement
		thumbNailImageFileUploadInput.click() // launch the file upload dialog
	}

	const handleThumbNailFileUploadChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (event.target.files) {
			// setting the state is asynchronous;
			// need to use the useEffect hook to perform an action on state update
			setThumbNailFile(event.target.files[0])
		}
	}

	const handleSaveButtonClick = async (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.stopPropagation()
		event.preventDefault()

		setTimeout(() => {
			disableProductForm()
		}, 200)

		const productName = document.querySelector(
			'#productName'
		) as HTMLInputElement
		const productBrand = document.querySelector(
			'#productBrand'
		) as HTMLInputElement
		const productPrice = document.querySelector(
			'#productPrice'
		) as HTMLInputElement

		const productDescription = document.querySelector(
			'#productDescription'
		) as HTMLInputElement
		const productFlavour = document.querySelector(
			'#productFlavour'
		) as HTMLInputElement
		const productPuffs = document.querySelector(
			'#productPuffsNumber'
		) as HTMLInputElement

		const productIngredients = document.querySelector(
			'#productIngredients'
		) as HTMLInputElement
		const productType = document.querySelector(
			'#productType'
		) as HTMLSelectElement

		const productQuantity = document.querySelector(
			'#productQuantity'
		) as HTMLInputElement

		setTimeout(() => {
			// validate product details
			let isValid = true
			if (productName.value === undefined || productName.value.trim() === '') {
				productName.setAttribute('style', 'color: red')
				isValid = false
			}
			if (
				productBrand.value === undefined ||
				productBrand.value.trim() === ''
			) {
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
			if (
				productFlavour.value === undefined ||
				productFlavour.value.trim() === ''
			) {
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
				let imageBlob = undefined
				if (thumbNailFile) {
					thumbNailFile.arrayBuffer().then((arrayBuffer) => {
						const buffer = Buffer.from(arrayBuffer)
						imageBlob = buffer.toString('base64')

						// if valid, continue
						const productId = document.querySelector(
							'#productId'
						) as HTMLInputElement
						let pId = 0
						if (productId.value != null) {
							pId = Number.parseInt(productId.value)
						}

						const p: Product = {
							name: productName.value,
							brand: productBrand.value,
							price: pPrice,
							description: productDescription.value,
							image_blob: imageBlob,
							flavour_name: productFlavour.value,
							puffs_number: pPuffs,
							ingredients: productIngredients.value,
							type_product: productType.value,
							quantity: pQuantity
						}

						updateProduct(pId, p)
							.then((data) => {
								if (data.error) {
									throw new Error('Error updating product.')
								} else {
									// Redirect to the products page
									router.push('/products')
								}
							})
							.catch((error) => {
								console.error('Error updating product:', error)

								// Display error message to the user
								setErrorMsg(error.message)
							})

						return true
					})
				}
			}
		}, 200)
	}

	const productItem = use(product)

	if (!productItem.id) {
		throw new Error('Error loading product')
	}

	useEffect(() => {
		setupFocusInputFields()
	}, []) // empty array means executed once

	useEffect(() => {
		const thumbNailImageName = document.querySelector(
			'#thumbnailImageName'
		) as HTMLParagraphElement
		thumbNailImageName.innerText = thumbNailFile
			? thumbNailFile.name
			: 'No file selected'
	}, [router, thumbNailFile])

	return (
		<>
			<form id='productForm' name='productForm'>
				<div className={styles.productForm}>
					<input
						type='hidden'
						id='productId'
						name='productId'
						value={productItem.id}
					/>
					<div className={styles.row}>
						<div className={styles.labelField}>
							<label>Name:</label>
						</div>
						<div className={styles.inputField}>
							<input
								type='text'
								id='productName'
								name='productName'
								placeholder='Please enter the product name'
								alt='Product name'
								maxLength={255}
								size={30}
								defaultValue={productItem.name}
							/>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.labelField}>
							<label>Brand:</label>
						</div>
						<div className={styles.inputField}>
							<input
								type='text'
								id='productBrand'
								name='productBrand'
								placeholder='Please enter the product brand'
								alt='Product brand'
								maxLength={255}
								size={30}
								defaultValue={productItem.brand}
							/>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.labelField}>
							<label>Flavour name:</label>
						</div>
						<div className={styles.inputField}>
							<input
								type='text'
								id='productFlavour'
								name='productFlavour'
								placeholder='Please enter the product flavour'
								alt='Product flavour'
								maxLength={255}
								size={30}
								defaultValue={productItem.flavour_name}
							/>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.productTypeLabelField}>
							<label>Type:</label>
						</div>
						<div className={styles.productTypeSelectField}>
							<select title='Product type' id='productType' name='productType'>
								<option value='P' id='productTypePod'>
									Pod
								</option>
								<option value='B' id='productTypeBattery'>
									Battery
								</option>
							</select>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.labelField}>
							<label>Price:</label>
						</div>
						<div className={styles.inputField}>
							<input
								type='text'
								id='productPrice'
								name='productPrice'
								placeholder='Please enter the product price'
								alt='Product price'
								maxLength={10}
								size={30}
								defaultValue={productItem.price}
							/>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.labelField}>
							<label>Quantity:</label>
						</div>
						<div className={styles.inputField}>
							<input
								type='text'
								id='productQuantity'
								name='productQuantity'
								placeholder='Please enter the product quantity'
								alt='Product quantity'
								maxLength={3}
								size={30}
								defaultValue={productItem.quantity}
							/>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.labelField}>
							<label>Number of puffs:</label>
						</div>
						<div className={styles.inputField}>
							<input
								type='text'
								id='productPuffsNumber'
								name='productPuffsNumber'
								placeholder='Please enter the number of puffs'
								alt='Product number of puffs'
								maxLength={5}
								size={30}
								defaultValue={productItem.puffs_number}
							/>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.labelField}>
							<label>Description:</label>
						</div>
						<div className={styles.inputField}>
							<input
								type='text'
								id='productDescription'
								name='productDescription'
								placeholder='Please enter the product description'
								alt='Product description'
								maxLength={255}
								size={30}
								defaultValue={productItem.description}
							/>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.labelField}>
							<label>Ingredients:</label>
						</div>
						<div className={styles.inputField}>
							<input
								type='text'
								id='productIngredients'
								name='productIngredients'
								placeholder='Please enter the product ingredients'
								alt='Product ingredients'
								maxLength={255}
								size={30}
								defaultValue={productItem.ingredients}
							/>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.labelField}>
							<label>Thumbnail image:</label>
						</div>
						<div className={styles.thumbnailImage}>
							<button
								id='thumbNailImageFileUploadButton'
								type='button'
								className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
								onClick={handleThumbNailFileClick}
							>
								Upload
							</button>
						</div>
						<div className={styles.thumbnailImage}>
							<input
								type='file'
								id='thumbNailImageFileUploadInput'
								title='Thumbnail image'
								accept='image/*'
								className={styles.imageFileInput}
								onChange={handleThumbNailFileUploadChange}
							/>
						</div>
						<div className={styles.thumbnailImage}>
							<p id='thumbnailImageName'>No file selected</p>
						</div>
					</div>
				</div>
				<div className={styles.buttonGroup}>
					<div className={styles.rightButton}>
						<button
							id='saveButton'
							type='submit'
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
							onClick={handleSaveButtonClick}
						>
							Save
						</button>
					</div>
				</div>
			</form>
			{errorMsg && <ErrorComponent error={new Error(errorMsg)} />}
		</>
	)
}
