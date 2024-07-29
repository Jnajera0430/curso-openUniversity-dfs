const { default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema({
    description: String,
    idBlog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }
});

const Comment = mongoose.model("Comment", commentSchema);
commentSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = Comment;