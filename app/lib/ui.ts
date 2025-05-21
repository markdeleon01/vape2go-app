export const disableProductForm = () => {
    const saveButton = document.querySelector('#saveButton') as HTMLButtonElement
    saveButton.innerText = 'Saving...'
    saveButton.setAttribute('disabled', '')
    saveButton.className =
        'text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-full text-sm px-5 py-2.5 text-center'

    const productForm = document.querySelector('#productForm') as HTMLFormElement
    const inputs = productForm.elements
    for (let i = 0; i < inputs.length; i++) {
        // Disable all form input fields
        const e = inputs[i]
        if (e instanceof HTMLInputElement) {
            e.setAttribute('disabled', '')
            e.style.backgroundColor = 'lightgrey'
        }
    }
}

export const enableProductForm = () => {
    const saveButton = document.querySelector('#saveButton') as HTMLButtonElement
    saveButton.innerText = 'Save'
    saveButton.removeAttribute('disabled')
    saveButton.className =
        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'

    const productForm = document.querySelector('#productForm') as HTMLFormElement
    const inputs = productForm.elements
    for (let i = 0; i < inputs.length; i++) {
        // Enable all form input fields
        const e = inputs[i]
        if (e instanceof HTMLInputElement) {
            e.removeAttribute('disabled')
            e.style.backgroundColor = 'white'
        }
    }
}

export const setupFocusInputFields = () => {
    const productForm = document.querySelector('#productForm') as HTMLFormElement
    const inputs = productForm.elements
    for (let i = 0; i < inputs.length; i++) {
        // set color to black on focus
        const e = inputs[i]
        if (e instanceof HTMLInputElement) {
            e.addEventListener('focus', function () {
                e.setAttribute('style', 'color: black')
            })
        }
    }
}