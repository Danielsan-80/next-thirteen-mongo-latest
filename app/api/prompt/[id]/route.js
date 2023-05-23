//GET
import { connectToDb } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async(req, {params})=> {
    try {
        await connectToDb()

        const prompt = await Prompt.findById(params.id).populate('creator')
        if(!prompt){
            return new Response('prompt not found', {status: 404})
        }
        return new Response(JSON.stringify(prompt), {status: 200})
    } catch (error) {
        return new Response('failed to fetch props', {status: 500})
    }
}

//PATCH
export const PATCH = async(req, {params})=>{
    const { prompt, tag } = await req.json()

    try {
        await connectToDb()
        const existingPrompt = await Prompt.findById(params.id)
        if(!existingPrompt){
            return new Response('prompt not found', {status: 404})
        }
        existingPrompt.prompt = prompt
        existingPrompt.tag = tag
        await existingPrompt.save()

        return new Response(JSON.stringify(existingPrompt), {status: 200})

    } catch (error) {
        return new Response('failed to update the prompt', {status: 500})
    }
}

//DELETE
export const DELETE = async(req, {params})=>{
    try {
        await connectToDb()
        await Prompt.findByIdAndRemove(params.id)
        return new Response('prompt successfully deleted', {status: 200})
    } catch (error) {
        return new Response('failed to delete prompt', {status: 500})
    }
}