import { Request, Response } from "express"
import database from "../database/database"

const findAll = async (req: Request, res: Response) => {
    // Use 200 status code, on success
        // If nothing was found, return 204 status code
    // Use 500 status code, on fail
}
    
const createOne = async (req: Request, res: Response) => {
    // Use 201 status code, on success
        // If nothing was found, return 204 status code
    // Use 500 status code, on fail
}

const updateOne = async (req: Request, res: Response) => {
    // Use 204 status code, on success
    // Use 400 status code, if some value was not included
    // Use 500 status code, on fail
}

const deleteOne = async (req: Request, res: Response) => {
    // Use 204 status code, on success
    // Use 400 status code, if some value was not included
    // Use 500 status code, on fail
}

export default { findAll, createOne, deleteOne }
