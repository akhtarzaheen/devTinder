const authAdmin = (req,res,next) => {
    let token = "xyz";
    if(token !== "xyz"){
        res.status(401).send("Authorized Admin");
    }else{
        console.log('Authorized admin');
        next();
    }
}

const authUser = (req,res,next) => {
    let token = "xyz";
    if(token !== "xyz"){
        res.status(401).send("Authorized Admin");
    }else{
        console.log('Authorized user');
        next();
    }
}

module.exports = {
    authAdmin,
    authUser
}