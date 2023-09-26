import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const username=process.env.DB_USERNAME ||'';
const password=process.env.DB_PASSWORD ||'';
const clustername=process.env.DB_CLUSTER||'';
const database=process.env.DB_DATABASE||'';

const uri=`mongodb+srv://${username}:${password}@${clustername}/${database}?retryWrites=true&w=majority`

const conectdb = async () => {
    try {
        mongoose.connect(uri, { useNewUrlParser: true,  });
        console.log("db conect successfully");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }


}
export default conectdb;
//useUnifiedTopology: true

