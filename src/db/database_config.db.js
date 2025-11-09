import mongoose from "mongoose";

const connectToDB = async () => {
    try{
        const connectToInstance = await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log(`MONGODB CONNECTED AT THE HOST: ${connectToInstance.connection.host}`);

    }catch(error){
        console.log('MONGODB CONNECTION FAILED:', error);
        process.exit(1);
    }
}

export default connectToDB