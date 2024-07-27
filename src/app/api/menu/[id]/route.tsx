import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import { Items } from "@/models/Menu";
import { uploadOnCloudinary } from "@/components/utils/cloudinary";
import multer from "multer";
import { promisify } from "util";
import fs from "fs";
import { v2 as cloudinary } from 'cloudinary';

connect();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const items = await Items.findById(id);
        return NextResponse.json({ message: items }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        await Items.findByIdAndDelete(id);
        return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

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

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const form = await request.formData();
        const foodName = form.get('foodName') as string;
        const cussine = form.get('cussine') as string;
        const discount = form.get('discount') as string;
        const price = form.get('price') as string;
        const discountedPrice = form.get('discountedPrice') as string;
        const tags = form.get('tags') ;
        const rating = form.get('rating') ;
        const file = form.get('image');

        let image: string | null = null;

        if (typeof file === 'string') {
            // Check if the URL is from Cloudinary
            const isCloudinaryUrl = file.startsWith('https://res.cloudinary.com/');
            if (isCloudinaryUrl) {
                image = file;
            } else {
                throw new Error("Invalid image URL");
            }
        } else if (file && file instanceof Blob) {
            const fileBuffer = Buffer.from(await file.arrayBuffer());
            const filePath = `public/uploads/${file.name}`;
            fs.writeFileSync(filePath, fileBuffer);

            const uploader = async (path: string) => await uploadOnCloudinary(path);
            const avatarResponse = await uploader(filePath);

            if (avatarResponse) {
                image = avatarResponse.secure_url;
            } else {
                throw new Error("Failed to upload image to Cloudinary");
            }

            // Remove the file after upload
            fs.unlinkSync(filePath);
        }

        const data = {
            CloudanaryImageId: image,
            DISCOUNT: discount,
            CUSSINE: cussine,
            FOODNAME: foodName,
            PRICE: price,
            DISCOUNTED_PRICE: discountedPrice,
            TAGS: tags,
            RATINGS: rating
        };

        console.log(data);
        const res = await Items.findOneAndUpdate(
            { _id: id },
            { $set: data },
            { new: true }
        );

        if (!res) {
            throw new Error("User not found");
        }

        return NextResponse.json({ message: "Profile updated successfully", data }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const form = await request.formData();
        const foodName = form.get('foodName') as string;
        const cussine = form.get('cussine') as string;
        const discount = form.get('discount') as string;
        const price = form.get('price') as string;
        const discountedPrice = form.get('discountedPrice') as string;
        const tags = form.get('tags') ;
        const rating = form.get('rating') ;
        const file = form.get('image');

        let image: string | null = null;

        if (typeof file === 'string') {
            // Check if the URL is from Cloudinary
            const isCloudinaryUrl = file.startsWith('https://res.cloudinary.com/');
            if (isCloudinaryUrl) {
                image = file;
            } else {
                throw new Error("Invalid image URL");
            }
        } else if (file && file instanceof Blob) {
            const fileBuffer = Buffer.from(await file.arrayBuffer());
            const filePath = `public/uploads/${file.name}`;
            fs.writeFileSync(filePath, fileBuffer);

            const uploader = async (path: string) => await uploadOnCloudinary(path);
            const avatarResponse = await uploader(filePath);

            if (avatarResponse) {
                image = avatarResponse.secure_url;
            } else {
                throw new Error("Failed to upload image to Cloudinary");
            }

            // Remove the file after upload
            fs.unlinkSync(filePath);
        }

        const newItem = new Items({
            CloudanaryImageId: image,
            DISCOUNT: discount,
            CUSSINE: cussine,
            FOODNAME: foodName,
            PRICE: price,
            DISCOUNTED_PRICE: discountedPrice,
            TAGS: tags,
            RATINGS: rating
        });

        const savedItem = await newItem.save();

        return NextResponse.json({ message: "Item added successfully", data: savedItem }, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
