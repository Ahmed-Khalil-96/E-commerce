import authRouter from "./Modules/Authentication/auth.routes.js";
import categoryRouter from "./Modules/categories/category.routes.js";
import subCategoriesRouter from "./Modules/subCategories/subCategories.routes.js";
import superAdminRouter from "./Modules/superAdmin/superAdmin.routes.js";
import userRouter from "./Modules/User/user.routes.js";


export{
    userRouter,authRouter,superAdminRouter, categoryRouter,subCategoriesRouter
}