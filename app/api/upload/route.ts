import {NextResponse} from "next/server";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
const firebaseConfig = {
    storageBucket: 'gs://learn-next-dashboard-e11ae.appspot.com',
}

const metadata = {
    contentType: 'image/jpeg',
};

export async function POST(req: Request){
    const formData = await req.formData()

    const image: any = formData.get('image')
    console.log(image)
    if (!image){
        return NextResponse.json({error: 'No image found'}, {status: 400})
    }

    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const fileToBase64 = buffer.toString('base64')

    const app = initializeApp(firebaseConfig)
    const storage = getStorage(app)
    const storageRef  = ref(storage, image.name)

    await uploadString(storageRef , fileToBase64, 'base64', metadata)
    const firebaseUrl = await getDownloadURL(storageRef )
    return NextResponse.json({
        message: 'Image uploaded successfully',
        url: firebaseUrl
    })

}