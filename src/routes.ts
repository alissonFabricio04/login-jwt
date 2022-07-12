import { Router, Request, Response } from "express";

import { Auth } from "./useCase/middleware/auth"

// User Controllers
import { CreateUserController } from "./useCase/User/createUser/createUser-controller"
import { SignInUserController } from "./useCase/User/loginUser/SignInUser-controller"
import { ListPostsController } from "./useCase/User/listPostsInUser/listPosts-controller"
import { EditBioUserController } from "./useCase/User/editBioUser/editBioUser-controller"

// Post Controllers
import { CreatePostController } from "./useCase/Post/createPost/createPost-controller"
import { ListLastTenPostsController } from "./useCase/Post/listLastTenPosts/listLastTenPosts-controller"

const routes = Router()

const middlewareAuth = new Auth()

// User Routes
routes.post("/api/user/create", new CreateUserController().create)
routes.post("/api/user/signIn", new SignInUserController().signIn)
routes.get("/api/user/posts", middlewareAuth.isAuth, new ListPostsController().list)
routes.put("/api/user/edit/bio", middlewareAuth.isAuth, new EditBioUserController().edit)

// Post Routes
routes.post("/api/post/create", middlewareAuth.isAuth, new CreatePostController().create)
routes.get("/api/post/list", new ListLastTenPostsController().list)


export { routes }