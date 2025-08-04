import {NextResponse} from "next/server";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyD1S03a6mmJvnEPcraBY5p0vMm32-TxWrE",
    authDomain: "auth-example-9a434.firebaseapp.com",
    databaseURL: "https://auth-example-9a434-default-rtdb.firebaseio.com",
    projectId: "auth-example-9a434",
    storageBucket: "auth-example-9a434.appspot.com",
    messagingSenderId: "570535479049",
    appId: "1:570535479049:web:17765216f82cf719b475d8"
}

const metadata = {
    contentType: 'image/jpeg',
};

export async function POST(req: Request){
    const path = "next-images/customer/"
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
    const storageRef  = ref(storage, `${path}${image.name}`)

    await uploadString(storageRef , fileToBase64, 'base64', metadata)
    const firebaseUrl = await getDownloadURL(storageRef )
    return NextResponse.json({
        message: 'Image uploaded successfully',
        url: firebaseUrl
    })

}
