import { NextRequest, NextResponse } from 'next/server'
import { createWalletClient, http, parseEther } from 'viem'
import { base } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'
import EmotiArtNFT from '../../../contracts/EmotiArtNFT.json'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!
const PRIVATE_KEY = process.env.NFT_MINTER_PRIVATE_KEY!

if (!CONTRACT_ADDRESS || !PRIVATE_KEY) {
  throw new Error('Missing required environment variables for NFT minting')
}

const account = privateKeyToAccount(PRIVATE_KEY as `0x${string}`)
const client = createWalletClient({
  account,
  chain: base,
  transport: http()
})

export async function POST(request: NextRequest) {
  try {
    const { artworkId, emotion, style, imageUrl, recipientAddress, tokenURI } = await request.json()

    if (!artworkId || !emotion || !style || !imageUrl || !recipientAddress || !tokenURI) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Mint the NFT
    const hash = await client.writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: EmotiArtNFT.abi,
      functionName: 'mintArtwork',
      args: [recipientAddress, emotion, style, imageUrl, tokenURI]
    })

    // Wait for transaction confirmation
    const receipt = await client.waitForTransactionReceipt({ hash })

    return NextResponse.json({
      success: true,
      txHash: hash,
      tokenId: receipt.logs[0]?.topics[3] // Extract tokenId from logs
    })
  } catch (error) {
    console.error('Error minting NFT:', error)
    return NextResponse.json(
      { error: 'Failed to mint NFT', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

