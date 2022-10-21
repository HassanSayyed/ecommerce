const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {type:String , require: true , unique : true},
        email:    {type:String , require: true , unique : true},
        password: {type:String , required:true },

        isAdmin : {
            type: Boolean,
            default: false
        },

        
    },
    {timestamps: true} // add createdAt & updatedAt attributes
)

module.exports = mongoose.model("User", userSchema);