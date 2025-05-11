'use client'

import { Product } from '../lib/product'
import styles from './styles.productForm.module.css'

export default function ProductForm( {product} : {product:Product} ) {
	console.log(product)
	
	return (
		<>
			<div className={styles.productForm}>
				<div className={styles.row}>
					<div className={styles.labelField}>
						<label>
						Name:
						</label>
					</div>
					<div className={styles.inputField}>
						<input type='text' id="productName" name="productName" placeholder='Please enter the product name' alt='Product name' maxLength={255} size={50} defaultValue={product.name}/>
					</div>
				</div>
				<div className={styles.row}>
					<div className={styles.labelField}>
						<label>
						Brand:
						</label>
					</div>
					<div className={styles.inputField}>
						<input type='text' id="productBrand" name="productBrand" placeholder='Please enter the product brand' alt='Product brand' maxLength={255} size={50} defaultValue={product.brand}/>
					</div>
				</div>
				<div className={styles.row}>
					<div className={styles.labelField}>
						<label>
						Flavour name:
						</label>
					</div>
					<div className={styles.inputField}>
						<input type='text' id="productFlavour" name="productFlavour" placeholder='Please enter the product flavour' alt='Product flavour' maxLength={255} size={50} defaultValue={product.flavour_name}/>
					</div>
				</div>
				<div className={styles.row}>
					<div className={styles.labelField}>
						<label>
						Description:
						</label>
					</div>
					<div className={styles.inputField}>
						<input type='text' id="productDescription" name="productDescription" placeholder='Please enter the product description' alt='Product description' maxLength={255} size={50} defaultValue={product.description}/>
					</div>
				</div>
				<div className={styles.row}>
					<div className={styles.labelField}>
						<label>
						Number of puffs:
						</label>
					</div>
					<div className={styles.inputField}>
						<input type='text' id="productPuffsNumber" name="productPuffsNumber" placeholder='Please enter the product number of puffs' alt='Product number of puffs' maxLength={5} size={50} defaultValue={product.puffs_number}/>
					</div>
				</div>
				<div className={styles.row}>
					<div className={styles.labelField}>
						<label>
						Ingredients:
						</label>
					</div>
					<div className={styles.inputField}>
						<input type='text' id="productIngredients" name="productIngredients" placeholder='Please enter the product ingredients' alt='Product ingredients' maxLength={255} size={50} defaultValue={product.ingredients}/>
					</div>
				</div>
				<div className={styles.row}>
					<div className={styles.labelField}>
						<label>
						Price:
						</label>
					</div>
					<div className={styles.inputField}>
						<input type='text' id="productPrice" name="productPrice" placeholder='Please enter the product price' alt='Product price' maxLength={10} size={50} defaultValue={product.price}/>
					</div>
				</div>
				<div className={styles.row}>
					<div className={styles.labelField}>
						<label>
						Quantity:
						</label>
					</div>
					<div className={styles.inputField}>
						<input type='text' id="productQuantity" name="productQuantity" placeholder='Please enter the product quantity' alt='Product quantity' maxLength={3} size={50} defaultValue={product.quantity}/>
					</div>
				</div>
			</div>
		</>
	)
}
