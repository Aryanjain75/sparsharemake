import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import movies from "@/models/movies";

import { Items } from "@/models/Menu";
import { uploadOnCloudinary } from "@/components/utils/cloudinary";
import multer from "multer";
import { promisify } from "util";
import fs from "fs";
import { v2 as cloudinary } from 'cloudinary';
import { title } from "process";

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
        
        // Validation
        if (!titleText) {
            return NextResponse.json({ "error": "Please provide title" }, { status: 404 });
        }
        if (!titleType) {
            return NextResponse.json({ "error": "Please provide title type" }, { status: 404 });
        }
        if (!originalTitleText) {
            return NextResponse.json({ "error": "Please provide movie name" }, { status: 404 });
        }
        if (!primaryImage) {
            return NextResponse.json({ "error": "Please provide image" }, { status: 404 });
        }
        if (!heros || !Array.isArray(heros) || heros.length === 0) {
            return NextResponse.json({ "error": "Please provide heros" }, { status: 404 });
        }
        if (!releaseYear) {
            return NextResponse.json({ "error": "Please provide year" }, { status: 404 });
        }
        if (!ratingsSammary) {
            return NextResponse.json({ "error": "Please provide rating" }, { status: 404 });
        }
        if (typeof runtime !== 'number' || runtime <= 0) {
            return NextResponse.json({ "error": "Please provide a valid runtime" }, { status: 404 });
        }
        if (!certificateratting) {
            return NextResponse.json({ "error": "Please provide certificate rating" }, { status: 404 });
        }
        if (typeof canRate !== 'boolean') {
            return NextResponse.json({ "error": "Please provide rating option" }, { status: 404 });
        }
        if (!titleGenres || !Array.isArray(titleGenres) || titleGenres.length === 0) {
            return NextResponse.json({ "error": "Please provide genres" }, { status: 404 });
        }

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
        return NextResponse.json({ "message": "Successful" }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ "error": e.message }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const res = await movies.find({});
        return NextResponse.json({ res }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ "error": e.message }, { status: 500 });
    }
}
