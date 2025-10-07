const AuthorSchema = require("../schema/author.schema")

const getAllAuthors = async (req, res) => {
    try {
        const author = await AuthorSchema.find()

        res.status(200).json(author)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const addAuthor = async (req, res) => {
    try {
        const { full_name, birth_date, death_date, img, bio, period, region,cretivity } = req.body
        await AuthorSchema.create({ full_name, birth_date, death_date, img, bio, period, region ,cretivity})
        res.status(200).json({
            message: "Added new author"
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getOneAuthor = async (req, res) => {
    try {
        const { id } = req.params
        const founfdedAuthor = await AuthorSchema.findById(id)

        if (!founfdedAuthor) {
            return res.status(404).json({
                message: "Author not found"
            })
        }
        res.status(200).json(founfdedAuthor)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateAuthor = async (req, res) => {
    try {
        const { full_name, birth_date, death_date, img, bio, period, region } = req.body

        const { id } = req.params
        const founfdedAuthor = await AuthorSchema.findById(id)

        if (!founfdedAuthor) {
            return res.status(404).json({
                message: "Author not found"
            })
        }
        await AuthorSchema.findByIdAndUpdate(id,{ full_name, birth_date, death_date, img, bio, period, region })
        res.status(201).json({
                message: "Update author"
            })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteAuthor = async (req, res) => {
    try {
    const { id } = req.params
        const founfdedAuthor = await AuthorSchema.findById(id)

        if (!founfdedAuthor) {
            return res.status(404).json({
                message: "Author not found"
            })
        }
        await AuthorSchema.findByIdAndDelete(id)
        res.status(201).json({
                message: "Author deleted"
            })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const search = async (req, res) => {
    try {
    const {name}=req.query

    const search=await AuthorSchema.find({
        full_name:{$regex:name, $options:"i"}
    })

    res.status(200).json(search)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAllAuthors,
    getOneAuthor,
    addAuthor,
    updateAuthor,
    deleteAuthor,
    search
}