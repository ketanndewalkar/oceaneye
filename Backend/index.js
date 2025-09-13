import express, { urlencoded } from 'express';
import connectdb from './src/db/index.js';
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

// import all routes 

import userRoutes from "./src/routes/user.routes.js"
import reportRoutes from "./src/routes/reports.routes.js"



const app = express()
dotenv.config()
app.use(express.urlencoded ( {extended:true}))
app.use(express.json());
app.use(cors())
app.use(cookieParser())

const PORT = process.env.PORT

// All routes structure
app.use('/api/v1/users',userRoutes)
app.use('/api/v1/reports',reportRoutes)


connectdb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at ${process.env.PORT}`);
    });
  }) 
  .catch((err) => {
    console.error("Error", err);
  });