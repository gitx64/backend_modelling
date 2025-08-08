const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        console.log("Error in asyncHandling: ", error)
    }
}

// const asyncHandlerPromise = (fn) => {
//     (req, res, next) => 
//         Promise.resolve(fn(req, res, next)).catch((err) =>{
//             res.status(err.code || 500).json({
//                 success: false,
//                 message: err.message
//             })
//              next(err)})
// }


export { asyncHandler }