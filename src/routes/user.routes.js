import { Router } from "express";
import registerUser from '../controllers/user.controller.js'
import Upload from '../middlewares/multer.middleware.js'

const router = Router();

router.route("/register").post(
    Upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'coverImage', maxCount: 1 }
    ]),// thats how middle wares are injected in http methods.
    registerUser
)


export default router;

