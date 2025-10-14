const {Router} = require('express')
const{ getAllAuthors, search, getOneAuthor, addAuthor, updateAuthor,deleteAuthor }=require("../controller/author.controller")
const { validate } = require('../schema/author.schema')
const authorValidator = require('../validator/author.validator')

const AuthorRouter = Router()


AuthorRouter.get("/get_all_authors", getAllAuthors)
AuthorRouter.get("/search", search)
AuthorRouter.get("/get_one_author/:id", getOneAuthor)
AuthorRouter.post("/add_author",validate(authorValidator), addAuthor)
AuthorRouter.put("/update_author/:id", updateAuthor)
AuthorRouter.delete("/delete_author/:id", deleteAuthor)



module.exports = AuthorRouter