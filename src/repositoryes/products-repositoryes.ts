import { productsDb } from "../db"


export const productsRepository = {
    findProducts(title: string | undefined | null) {
        if (title) {
            let filterProducts = productsDb.filter(el => el.title.indexOf(title) > -1)
            return filterProducts
        } else {
            return productsDb
        }
    },
    findProductById(id: number) {
        const product = productsDb.find(el => el.id === id)
        return product;
    },
    createProduct(title: string) {
        const newProduct = {
            id: new Date().getTime(),
            title: title
        }

        productsDb.push(newProduct)
        return newProduct
    },
    updateProduct(id: number, newTitle: string) {
        const product = productsDb.find(el => el.id === +id)
        if (product) {
            product.title = newTitle
            return true
        } else {
            return false
        }
    },
    deleteProduct(id: number) {
        for (let i = 0; i < productsDb.length; i++) {
            if (productsDb[i].id === +id) {
                productsDb.splice(i, 1)
                return true
            }
        }
        return false
    }
}