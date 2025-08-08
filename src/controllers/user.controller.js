import {asyncHandler} from '../utils/asyncHandler.js'

const userController = asyncHandler((req,res,next) => {
    res.status(200).json({
        message:"User controller is working"
    })

})

export default userController;