export async function imageUploader (event: any, file: string){
    event.preventDefault()
    const formData = new FormData()
    const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
    })
    const data = await response.json()
}