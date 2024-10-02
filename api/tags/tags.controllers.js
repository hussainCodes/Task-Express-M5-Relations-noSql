const TagSchema = require("../../models/Tag")

const createTag = async (req, res, next) =>{
    try {

       const newTag = await TagSchema.create(req.body);
       return res.status(201).json({data: newTag});
        
    } catch (error) {
        next(error);
    }
}

module.exports = {createTag}