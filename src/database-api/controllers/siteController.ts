import { Request, Response } from "express"
import Site from "../database/site.model"

async function findAll(_req: Request, res: Response) {
    let records = []

    try {
        records = await Site.findAll()
    } catch(error) {
        return res.status(500).json({ error })
    }

    return res.status(200).json(records)
}

async function createOne (req: Request, res: Response) {
    const { header, description, category, url } = req.body

    if (!header || !url || !description || !category) {
        return res.status(400).json({ message: "Cannot create a site record without necessary parameters." })
    }

    let record = null

    try {
        record = await Site.create({ header, description, category, url })
    } catch(error) {
        return res.status(500).json({ error })
    }

    if (record) {
        return res.status(201).json({ message: record })
    }
}

async function updateOne (req: Request, res: Response) {
    const { id } = req.params
    const { header, description, category, url } = req.body

    if (!header || !url || !id || !description || !category) {
        return res.status(400).json({ message: "Cannot update a site record without necessary parameters." })
    }

    const record = await Site.findOne({ where: { id } })

    if (!record) {
        return res.status(200).json({ message: "No such record exists." })
    }

    record.set({ header, description, category, url })

    try {
        await record.save()
        return res.status(204).json({ message: "Record updated" })
    } catch(error) {
        return res.status(500).json({ error })
    }
}

async function deleteOne(req: Request, res: Response) {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({ message: "Cannot delete a site record without a necessary parameter." })
    }

    const record = await Site.findOne({ where: { id } })

    if (!record) {
        return res.status(200).json({ message: "No such record exists." })
    }

    try {
        await record.destroy()
        return res.status(204).json({ message: "Record deleted." })
    } catch(error) {
        return res.status(500).json({ error })
    }
}

export default { findAll, createOne, updateOne, deleteOne }
