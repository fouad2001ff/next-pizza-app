import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";



export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    // Convert Blob to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate signature manually
    const timestamp = Math.floor(Date.now() / 1000);
    const folder = "profile_images";
    const transformation = "c_fill,g_face,h_200,w_200";

    const signature = cloudinary.v2.utils.api_sign_request(
      { folder, timestamp, transformation },
      process.env.CLOUDINARY_API_SECRET as string
    );
    console.log("Cloudinary API Secret:", process.env.CLOUDINARY_API_SECRET);


    // Upload image to Cloudinary
    const uploadResponse = await new Promise<cloudinary.UploadApiResponse>((resolve, reject) => {

      cloudinary.v2.uploader.upload_stream(
        { folder, transformation, timestamp, signature },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as cloudinary.UploadApiResponse);
        }
      ).end(buffer);
    });

    return NextResponse.json({ url: (uploadResponse as cloudinary.UploadApiResponse).secure_url });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
}
