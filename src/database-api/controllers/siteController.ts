import { Request, Response } from "express"
import Site from "../database/site.model"

const findAll = async (_req: Request, res: Response) => {
    let records = []

    try {
        records = await Site.findAll()
    } catch(error) {
        return res.status(500).json("Couldn't fetch records from table.")
    }

    if (records.length == 0) {
        return res.status(200).json("The table doesn't have any records in it.")
    }

    return res.status(200).json(records)
}
    
const createOne = async (req: Request, res: Response) => {
    const { header, url } = req.body

    if (!header || !url) {
        return res.status(400).send("Cannot create a site record without necessary parameters.")
    }

    const record = await Site.create({ header, url })

    if (record) {
        return res.status(201).json({ message: record })
    } else {
        return res.status(500).json({ message: "Couldn't create a new site record." })
    }
}

const updateOne = async (req: Request, res: Response) => {
    const id = req.params
    const { header, url } = req.body

    if (!header || !url || !id) {
        return res.status(400).send("Cannot update a site record without necessary parameters.")
    }

    const record = await Site.findOne({ where: { id } })

    if (!record) {
        return res.status(200).json({ message: "No such record exists." })
    }

    record.set({
        header,
        url
    })

    try {
        await record.save()
        return res.status(204).json({ message: "Record updated" })
    } catch(error) {
        return res.status(500).json({ error })
    }
}

const deleteOne = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).send("Cannot delete a site record without a necessary parameter.")
    }

    const record = await Site.findOne({ where: { id } })

    if (!record) {
        return res.status(200).json({ message: "No such record exists." })
    }

    try {
        await record.destroy()
        return res.status(200).json({ message: "Record deleted." })
    } catch(error) {
        return res.status(500).json({ error })
    }
}

export default { findAll, createOne, updateOne, deleteOne }
