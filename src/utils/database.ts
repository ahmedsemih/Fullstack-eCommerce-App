import mongoose from 'mongoose';

var isConnected = false;

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log('MongoDB is already connected');
        return true;
    }

    try {
        await mongoose.connect(`${process.env.MONGODB_URL}`,{
            dbName: 'pizzahaven'
        });

        isConnected = true;
        console.log('MongoDB connected');
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }

}