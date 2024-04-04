import { getDataFromToken } from "@/database/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/database/models/userModel";
import { connect } from "@/database/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {

              try {
                            const userId = await getDataFromToken(request);
                            const user = await User.findOne({ _id: userId }).select("-password imageUrl");
                            return NextResponse.json({
                                          mesaaage: "User found",
                                          data: user
                            })
              } catch (error: any) {
                            return NextResponse.json({ error: error.message }, { status: 400 });
              }

}