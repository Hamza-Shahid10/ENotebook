import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config()

const mongooseURI = process.env.MONGO_URI;

const connectToMongo = async () => {
  // try {
  //   await mongoose.connect(mongooseURI, {
  //     dbName: 'ENotebook', 
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true
  //   });
  //   console.log("Connected to MongoDB successfully.");
  // } catch (error) {
  //   console.error("MongoDB connection error:", error);
  //   process.exit(1);
  // }
  const mongooseSampleDataURI = process.env.SAMPLE_MONGO_URI;

  mongoose.connect(mongooseSampleDataURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB sample_mflix"))
  .catch((err) => console.log(err));
};


export default connectToMongo;

