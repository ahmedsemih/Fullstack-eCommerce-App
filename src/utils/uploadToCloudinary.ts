export default async (image: any) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET!);
    data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME!);
    const result = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: data
    });
    
    return result;
};