
import connection from '../DB/connectionDb.js'
import * as routers from './index.Routes.js'
import { AppError } from './utils/errorClass.js'
import { globalErrorHandling } from './utils/globalErrorHandling.js'
import dotenv from "dotenv"
dotenv.config({path: path.resolve("config/.env")});
import path from "path"

export const initApp = (app, express)=>{
  

app.use(express.json())
connection()

app.use("/superAdmin",routers.superAdminRouter)
app.use("/auth",routers.authRouter)
app.use("/user",routers.userRouter)
app.use("/category",routers.categoryRouter)
app.use("/subCategories",routers.subCategoriesRouter)
app.use('*', (req, res,next)=>{
    return next(new AppError("Invalid URL",404))
} )

app.use(globalErrorHandling)
app.listen(process.env.port, () => console.log(`Example app listening on port ${process.env.port}!`))
}