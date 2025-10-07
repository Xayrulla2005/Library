const mongoose= require ("mongoose")


async function connectDB() {
    try{
    await mongoose.connect(process.env.Mongo_URI).then(()=>console.log("DB is conected"))
    }catch (error){
        console.log(error.message);
        
    }
}


module.exports=connectDB