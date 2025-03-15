const mongoose = require("mongoose");

const dbConnect = async () => {
   return await mongoose.connect("mongodb+srv://MongoDBWithNode:ly483hAUNHG1AeXD@mongodbwithnode.jjb43.mongodb.net/devTinder");
}

module.exports = {
    dbConnect
}



