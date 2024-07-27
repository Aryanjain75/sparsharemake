import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/Resturent";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

connect();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { name, email, phone, date, time, noOfPeople, message } = await request.json();
    if (!name || !email || !phone || !date || !time || !noOfPeople || !message) {
      return NextResponse.json({ message: "User details are invalid" }, { status: 404 });
    }
    const token = request.cookies.get("Token");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const tokenString = token.value; 
    const decoded = jwt.decode(tokenString) as JwtPayload;
    if (!decoded || !decoded.id) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
    const booking = new User({
      userid: decoded.id,
      name,
      email,
      phone,
      date,
      time,
      noOfPeople,
      message
    });
    await booking.save();

    return NextResponse.json({ message: "Booking successful" }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
