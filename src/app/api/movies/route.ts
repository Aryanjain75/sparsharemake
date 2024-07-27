import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import movies from "@/models/movies";

import { Items } from "@/models/Menu";
import { uploadOnCloudinary } from "@/components/utils/cloudinary";
import multer from "multer";
import { promisify } from "util";
import fs from "fs";
import { v2 as cloudinary } from 'cloudinary';

connect();
// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    }
});

const upload = multer({ storage });
const uploadMiddleware = promisify(upload.single('image'));

// Cloudinary configuration
cloudinary.config({
    cloud_name: 'devj7oonz',
    api_key: '651936225214174',
    api_secret: 'Xk32-a3iLAGMf7Iv5o3DwVaDk9w'
});
export async function POST(request: NextRequest) {
    try {

        const res = await request.json();
        const { titleText, titleType, originalTitleText, primaryImage, heros, releaseYear, ratingsSammary, runtime, certificateratting, canRate, titleGenres } = res;
        
        
        const Movies = new movies(
            {
                titleText,
                titleType,
                originalTitleText,
                primaryImage,
                heros,
                releaseYear,
                ratingsSammary,
                runtime,
                certificateratting,
                canRate,
                titleGenres
            }
        );
        await Movies.save();
        return NextResponse.json({ "messsage": "Successful" }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ "error": e }, { status: 500 });
    }
}
export async function GET(request: NextRequest) {
    try {
        const res = await movies.find({});
        return NextResponse.json({ res }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ "error": e }, { status: 500 });
    }
}