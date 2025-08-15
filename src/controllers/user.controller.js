import {asyncHandler} from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'
import User from '../models/user.models.js'
import uploadCloudinary from '../utils/Cloudinary.js'
import ApiResponse from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async (req, res) => {
    // * get user details from frontend. (avatar, coverImage)
    // * validation - not empty
    // * user not exist : userName, email.
    // * check if all required things are taken. (avatar, coverImage, images)
    // * multer check.
    // * if available then upload them to cloudinary, avatar
    // * create user object - create entry in db
    // * As response to client, remove password and refresh token
    // check for user creation ? return res : return err

    const {fullName, userName, email, password} = req.body;

    console.log(req.body);
    console.log(req.file);
    console.log("Headers:", req.headers['content-type']);

    if(
    [fullName, userName, email, password].some((field) =>
        field?.trim() === ""
    )
    ){
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{userName}, {email}]
    })

    if(existedUser) {
        throw new ApiError(409, "User already exists")
    }

    // Fixed: Accessing file path correctly
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if(!avatarLocalPath)
        throw new ApiError(400, "Avatar is required");

    // Upload to cloudinary
    const avatar = await uploadCloudinary(avatarLocalPath);
    const coverImage = await uploadCloudinary(coverImageLocalPath);

   if(!avatar)
        throw new ApiError(500, "Failed to upload avatar image");
    // Create user object
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        userName: userName.toLowerCase(),
        email,
        password
    });

    const createdUser = await User.findById(user._id)
    .select("-password -refreshToken");

    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user");
    }

    return res.status(201).json({
        data : new ApiResponse(201, createdUser, "User registered successfully")
    });
})

export default registerUser;