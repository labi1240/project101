import { connect } from "@/database/dbConfig/dbConfig"; // Adjusted if dbConfig is indeed in the database folder
import User from "@/database/models/userModel"; // Adjusted to use the absolute path alias
import { NextRequest, NextResponse } from "next/server";
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