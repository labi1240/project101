import { NextRequest, NextResponse } from "next/server";
import cloudinary from 'cloudinary';
import User from "@/database/models/userModel";
import { connect } from "@/database/dbConfig/dbConfig";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function updateProfile(request: NextRequest) {
  try {
    connect();
    const { userId, username, email } = await request.json();
    const imageFile = request.files?.image;
    let uploadedImageUrl = '';

    if (imageFile) {
      const result = await cloudinary.v2.uploader.upload(imageFile.path);
      uploadedImageUrl = result.url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, {
      ...(username && { username }),
      ...(email && { email }),
      ...(uploadedImageUrl && { profileImageUrl: uploadedImageUrl })
    }, { new: true });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
