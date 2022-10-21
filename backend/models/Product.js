const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title:          {type:String , require: true , unique : true},
        description:    {type:String , require: true , unique : false},
        img:            {type:String , required:false },
        categories:     {type: Array },
        size:           {type:String , required:false },
        color:          {type:String , required:false },
        price:          {type:Number , required:false },
    },
    {timestamps: true} // add createdAt & updatedAt attributes
)

module.exports = mongoose.model("Product", productSchema);