import { getDataFromToken } from "@/database/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/database/models/userModel";
import { connect } from "@/database/dbConfig/dbConfig";

connect();

import { uploadImageToCloudinary } from '@/database/helpers/uploadImageToCloudinary';

export async function GET(request: NextRequest) {

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    if (!userId) throw new Error('User not found');

    // Assuming the image file is attached to the request body
    const { file } = request.body;
    if (!file) throw new Error('No image file provided');

    const imageUrl = await uploadImageToCloudinary(file);

    // Update user's avatar or cover image URL
    const updatedUser = await User.findByIdAndUpdate(userId, { avatar: imageUrl }, { new: true }).select('-password');
    if (!updatedUser) throw new Error('Failed to update user');

    return NextResponse.json({ message: 'Image uploaded successfully', data: updatedUser });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

              try {
                            const userId = await getDataFromToken(request);
                            const user = await User.findOne({ _id: userId }).select("-password");
                            return NextResponse.json({
                                          mesaaage: "User found",
                                          data: user
                            })
              } catch (error: any) {
                            return NextResponse.json({ error: error.message }, { status: 400 });
              }

}