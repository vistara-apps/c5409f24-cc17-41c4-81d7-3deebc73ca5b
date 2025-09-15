import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: false,
})

const stylePrompts = {
  'vibrant-abstract': 'vibrant abstract art with flowing colors and dynamic shapes',
  'minimalist-sketch': 'minimalist line art sketch with clean simple forms',
  'surreal-dreamscape': 'surreal dreamscape with ethereal floating elements and cosmic themes'
}

export async function POST(request: NextRequest) {
  try {
    const { emotion, style, userId } = await request.json()

    if (!emotion || !style) {
      return NextResponse.json(
        { error: 'Emotion and style are required' },
        { status: 400 }
      )
    }

    const styleDescription = stylePrompts[style as keyof typeof stylePrompts] || stylePrompts['vibrant-abstract']
    
    const prompt = `Create a beautiful ${styleDescription} that visually represents the emotion "${emotion}". The artwork should be expressive, colorful, and emotionally evocative. High quality digital art, masterpiece.`

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    })

    const imageUrl = response.data[0]?.url

    if (!imageUrl) {
      throw new Error('No image generated')
    }

    const artwork = {
      id: Math.random().toString(36).substr(2, 9),
      emotion,
      style,
      imageUrl,
      isNft: false,
      createdAt: new Date(),
      userId,
    }

    return NextResponse.json(artwork)
  } catch (error) {
    console.error('Error generating art:', error)
    return NextResponse.json(
      { error: 'Failed to generate art' },
      { status: 500 }
    )
  }
}
