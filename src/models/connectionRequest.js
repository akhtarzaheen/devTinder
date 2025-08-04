const { default: mongoose } = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.ObjectId,
        required:true,
    },
    toUserId:{
        type: mongoose.Schema.ObjectId,
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","interested"],
            message:`{VALUE} is not a valid status!`
        }
    }
});

connectionRequestSchema.index({fromUserId:1,toUserId:1});

connectionRequestSchema.pre("save",async function(next){
    let connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Send connection request to yourself not allowed!");
    }
    next();
})

module.exports = mongoose.model("ConnectionRequest",connectionRequestSchema);