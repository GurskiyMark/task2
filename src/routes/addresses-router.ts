import { Router, Request, Response } from "express";
import { addressesDb } from "../db";


export const addressesRouter = Router();

addressesRouter.get(`/`, (req: Request, res: Response) => {
    res.send(addressesDb)
})

addressesRouter.get(`/:id`, (req: Request, res: Response) => {
    const address = addressesDb.find(el => el.id === +req.params.id)
    address ? res.send(address) : res.send(404)
})