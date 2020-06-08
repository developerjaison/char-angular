const mongoose  = require('mongoose');
const Message = new mongoose.Schema({
    message:{
        type:String,
        required: '{PATH} is required!'
    },
    name :{
        type: String
    },
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Message', Message);