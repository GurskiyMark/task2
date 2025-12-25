import { Router, Request, Response } from "express";
import { productsRepository } from "../repositoryes/products-repositoryes";

export const productsRouter = Router()

//string | string[] | ParsedQs | ParsedQs[] | undefined      5 видов query параметров
productsRouter.get(`/`, (req: Request, res: Response) => {
   const foundProducts = productsRepository.findProducts(req.query.title?.toString())
   res.send(foundProducts)
})

productsRouter.get(`/:id`, (req: Request, res: Response) => {
    const product = productsRepository.findProductById(+req.params.id)
    product ? res.send(product) : res.sendStatus(404)
})

productsRouter.post(`/`, (req: Request, res: Response) => {
    const newProduct = productsRepository.createProduct(req.body.title)
    res.status(201).json(newProduct)
})

productsRouter.put(`/:id`, (req: Request, res: Response) => {
    const isUpdated = productsRepository.updateProduct(+req.params.id, req.body.title)
    if(isUpdated) {
        const product = productsRepository.findProductById(+req.params.id)
        res.send(product)
    } else {
        res.send(404)
    }
})

productsRouter.delete(`/:id`, (req:Request,res: Response) => {
    const isDeleted = productsRepository.deleteProduct(+req.params.id);
    if(isDeleted){
        res.send(204)
    } else {
        res.send(404)
    }
})
