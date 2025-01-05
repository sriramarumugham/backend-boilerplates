import mongo from 'mongoose';
import * as dotenv from "dotenv";

dotenv.config();

export const connectDb = () => {
  mongo
    .connect(process.env.MONGO_DB_URI || 'urlNotFound', {})
    .then((res) => {
      console.log(
        'mongodb connected successfully',
        process.env.MONGO_DB_URI || 'urlNotFound',
      );
    })
    .catch((err) => {
      console.log(err, '-->');
    });
};
