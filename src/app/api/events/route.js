import { NextResponse } from "next/server";

export async function GET(){
    const data = {
        name: 'Test',
        data: '43'
    }

    return NextResponse.json({data})
}

export async function POST(req){
    const data  = await req.json()
    console.log(`data: ${JSON.stringify(data)}`)

    return NextResponse.json(data)
}