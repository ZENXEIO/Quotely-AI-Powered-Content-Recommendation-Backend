import dotenv from "dotenv";
import connectToDB from "./src/db/database_config.db.js";
import app from "./app.js";

dotenv.config({
    path: "./.env"
});

connectToDB().then(
    ()=>{
        app.listen(process.env.PORT || 4000, ()=>{
            console.log(`port is running on:  http://localhost:${process.env.PORT}`);
        });
    }
).catch((error)=>{
    console.log("MONGODB FAILED TO CONNECT", error);
});

