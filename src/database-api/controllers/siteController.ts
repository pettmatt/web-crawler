import { Request, Response } from "express"
import Site from "../database/site.model.ts"

async function findAll(_req: Request, res: Response) {
    let records = []

    try {
        records = await Site.findAll()
    } catch (error) {
        return res.status(500).json({ error })
    }

    return res.status(200).json(records)
}

async function createOne (req: Request, res: Response) {
    const { header, description, tags, url } = req.body

    if (!header || !url) {
        return res.status(400).json({ message: "Cannot create a site record without necessary parameters.", body: req.body })
    }

    let record = null

    try {
        record = await Site.upsert({ header, description, tags, url }, { returning: false })
    } catch (error) {
        return res.status(500).json({ error })
    }

    if (record) {
        return res.status(201).json({ message: record })
    }
}

async function updateOne (req: Request, res: Response) {
    const { header, description, tags, url } = req.body

    if (!header || !url || !description || !tags) {
        return res.status(400).json({ message: "Cannot update a site record without necessary parameters." })
    }

    const record = await Site.findOne({ where: { url } })

    if (!record) {
        return res.status(200).json({ message: "No such record exists." })
    }

    record.set({ header, description, tags })

    try {
        await record.save()
        return res.status(204).json({ message: "Record updated" })
    } catch (error) {
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
    } catch (error) {
        return res.status(500).json({ error })
    }
}

export default { findAll, createOne, updateOne, deleteOne }
