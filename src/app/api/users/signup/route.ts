import { connect } from "@/database/dbConfig/dbConfig"; // Adjusted if dbConfig is indeed in the database folder
import User from "@/database/models/userModel"; // Adjusted to use the absolute path alias
import { NextRequest, NextResponse } from "next/server";
import cloudinary from 'cloudinary';

cloudinary.v2.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/database/helpers/mailer";



connect()


export async function POST(request: NextRequest) {
              try {
                            const reqBody = await request.json()
                            const { username, email, password, imageUrl } = reqBody

                            console.log(reqBody);

                            //check if user already exists
                            const user = await User.findOne({ email })

                            if (user) {
                                          return NextResponse.json({ error: "User already exists" }, { status: 400 })
                            }

                            //hash password
                            const salt = await bcryptjs.genSalt(10)
                            const hashedPassword = await bcryptjs.hash(password, salt)

                            const newUser = new User({
                                          username,
                                          email,
                                          password: hashedPassword,
                                          imageUrl: imageUrl || '' // imageUrl is optional
                            })

                            // Assuming 'request' contains the image file in a field named 'image'
const imageFile = request.files?.image;
let uploadedImageUrl = '';
if (imageFile) {
    const result = await cloudinary.v2.uploader.upload(imageFile.path);
    uploadedImageUrl = result.url;
}

newUser.profileImageUrl = uploadedImageUrl;

const savedUser = await newUser.save()
                            console.log(savedUser);

                            //send verification email

                            await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })

                            return NextResponse.json({
                                          message: "User created successfully",
                                          success: true,
                                          savedUser
                            })




              } catch (error: any) {
                            return NextResponse.json({ error: error.message }, { status: 500 })

              }
}