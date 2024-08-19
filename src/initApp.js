
import connection from '../DB/connectionDB.js'
import * as routers from './index.Routes.js'
import { deleteFromCloudinary } from './utils/deleteFromCloudinary.js'
import { deleteFromDb } from './utils/deleteFromDB.js'
import { AppError } from './utils/errorClass.js'
import { globalErrorHandling } from './utils/globalErrorHandling.js'
import dotenv from "dotenv"
dotenv.config({path: path.resolve("config/.env")});
import path from "path"
import cors from "cors"
import Stripe from 'stripe';
import { asyncHandler } from './utils/errorHandling.js'
let  checkoutSessionCompleted
const stripe = new Stripe(process.env.stripe_secret);


export const initApp = (app, express)=>{
    app.use((req, res, next) => {
        if (req.originalUrl === '/webhook') {
        next();
        } else {
        express.json()(req, res, next);
        }
        });
    
  
   


app.use(cors())
connection()
app.get("/",(req,res)=>{
    res.status(200).json("Server is running")
})

app.use("/superAdmin",routers.superAdminRouter)
app.use("/auth",routers.authRouter)
app.use("/user",routers.userRouter)
app.use("/category",routers.categoryRouter)
app.use("/subCategories",routers.subCategoriesRouter)
app.use("/brands",routers.brandRouter)
app.use("/products",routers.productRouter)
app.use("/coupons", routers.couponRouter)
app.use("/cart",routers.cartRouter)
app.use("/orders",routers.orderRouter)
app.use("/reviews",routers.reviewRouter)
app.use('*', (req, res,next)=>{
    return next(new AppError("Invalid URL",404))
} )

app.use(globalErrorHandling,deleteFromCloudinary,deleteFromDb)

}