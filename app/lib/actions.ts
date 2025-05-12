'use server'

import { redirect } from 'next/navigation'
import { Product } from './product'

import { updateProduct } from '../lib/service'

// server function/server action
export async function updateProductDetails(formData: FormData) {
	const productId = formData.get('productId')?.toString()
    let pId = 0
    if (productId != null) {
        pId = Number.parseInt(productId)
    }

	const productPrice = formData.get('productPrice')?.toString()
	let pPrice = 0
	if (productPrice != undefined) {
		pPrice = Number.parseInt(productPrice)
	}

	const productPuffs = formData.get('productPuffsNumber')?.toString()
	let pPuffs = 0
	if (productPuffs != undefined) {
		pPuffs = Number.parseInt(productPuffs)
	}

	const productQuantity = formData.get('productQuantity')?.toString()
	let pQuantity = 0
	if (productQuantity != undefined) {
		pQuantity = Number.parseInt(productQuantity)
	}

	const pType = formData.get('productType')?.toString()

	const p: Product = {
		name: formData.get('productName')?.toString(),
		brand: formData.get('productBrand')?.toString(),
		price: pPrice,
		description: formData.get('productDescription')?.toString(),
		image_blob: undefined,
		flavour_name: formData.get('productFlavour')?.toString(),
		puffs_number: pPuffs,
		ingredients: formData.get('productIngredients')?.toString(),
		type_product: pType,
		quantity: pQuantity
	}

    await updateProduct(pId, p)
    redirect('/products')
}