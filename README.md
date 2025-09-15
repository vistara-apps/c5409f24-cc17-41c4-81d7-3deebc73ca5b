# EmotiArt - Transform Emotions into Digital Art

A Base Mini App that generates unique AI art from user emotions, allowing them to own and share as NFTs.

## Features

- **Emotion-to-Art Generation**: Transform emotions into unique visual art using AI
- **Art Style Customization**: Choose from multiple art styles (Vibrant Abstract, Minimalist Sketch, Surreal Dreamscape)
- **NFT Minting**: Mint generated art as NFTs on the Base network
- **Social Sharing**: Share creations on Farcaster with integrated frames

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base network integration with OnchainKit
- **AI**: OpenAI DALL-E for art generation
- **Styling**: Tailwind CSS with custom design system
- **Social**: Farcaster integration via MiniKit

## Getting Started

1. **Clone and install dependencies**:
```bash
git clone <repository-url>
cd emotiart
npm install
```

2. **Set up environment variables**:
```bash
cp .env.example .env.local
```

Fill in your API keys:
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Get from Coinbase Developer Platform
- `NEXT_PUBLIC_MINIKIT_API_KEY`: Get from Base
- `OPENAI_API_KEY`: Get from OpenAI

3. **Run the development server**:
```bash
npm run dev
```

4. **Open in Base App or Farcaster client** to test Mini App functionality

## Project Structure

```
app/
├── layout.tsx          # Root layout with providers
├── page.tsx           # Main app interface
├── providers.tsx      # MiniKit and OnchainKit providers
├── globals.css        # Global styles and design tokens
└── api/
    ├── generate-art/  # AI art generation endpoint
    └── mint-nft/      # NFT minting endpoint

components/
├── AppShell.tsx       # Main app container
├── EmotionInput.tsx   # Emotion input with presets
├── StyleSelector.tsx  # Art style selection
├── ArtDisplay.tsx     # Generated art display
└── ActionButtons.tsx  # Mint, share, try again actions

contracts/
├── EmotiArtNFT.sol    # ERC721 smart contract
└── EmotiArtNFT.json   # Contract ABI

lib/
├── types.ts          # TypeScript type definitions
├── constants.ts      # App constants and configuration
└── utils.ts          # Utility functions
```

## Design System

The app uses a custom design system with:
- **Colors**: Purple/pink gradients with glass morphism effects
- **Typography**: Clean, modern font hierarchy
- **Spacing**: Consistent 4px base unit system
- **Components**: Reusable UI components with variants
- **Motion**: Smooth transitions and loading animations

## API Integration

### Art Generation (`/api/generate-art`)
Uses OpenAI's DALL-E API to generate unique artwork based on:
- User's emotional input
- Selected art style
- Custom prompts for each style variant

**Request:**
```json
{
  "emotion": "happy",
  "style": "vibrant-abstract",
  "userId": "fid_or_wallet_address"
}
```

**Response:**
```json
{
  "id": "unique_artwork_id",
  "emotion": "happy",
  "style": "vibrant-abstract",
  "imageUrl": "https://...",
  "isNft": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "userId": "fid_or_wallet_address"
}
```

### NFT Minting (`/api/mint-nft`)
Mints generated artwork as NFTs on the Base network.

**Request:**
```json
{
  "artworkId": "unique_artwork_id",
  "emotion": "happy",
  "style": "vibrant-abstract",
  "imageUrl": "https://...",
  "recipientAddress": "0x...",
  "tokenURI": "data:application/json;base64,..."
}
```

**Response:**
```json
{
  "success": true,
  "txHash": "0x...",
  "tokenId": "1"
}
```

### Blockchain Integration
- **Base Network**: Low-cost NFT minting
- **OnchainKit**: Wallet connection and transactions
- **MiniKit**: Farcaster integration and social features
- **Smart Contract**: Custom ERC721 for EmotiArt NFTs

## Development

### Adding New Art Styles
1. Add style definition to `lib/constants.ts`
2. Update `StyleSelector` component
3. Add corresponding prompt in API route

### Customizing Design
- Modify design tokens in `tailwind.config.ts`
- Update CSS variables in `app/globals.css`
- Adjust component variants as needed

## Deployment

### Smart Contract Deployment

1. **Deploy the EmotiArtNFT contract to Base**:
   - Use [Remix IDE](https://remix.ethereum.org/) to deploy `contracts/EmotiArtNFT.sol`
   - Or use Hardhat/Foundry with the provided deployment script
   - Target network: Base Mainnet
   - Required: Some ETH for gas fees

2. **Alternative deployment methods**:
```bash
# Using Thirdweb
npx thirdweb deploy

# Using Remix IDE (recommended for simplicity)
# 1. Go to remix.ethereum.org
# 2. Load contracts/EmotiArtNFT.sol
# 3. Compile and deploy to Base network
```

2. **Update environment variables** with the deployed contract address:
```bash
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x_your_deployed_contract_address
NFT_MINTER_PRIVATE_KEY=your_wallet_private_key
```

### Application Deployment

1. **Build the application**:
```bash
npm run build
```

2. **Deploy to Vercel or similar platform**

3. **Configure environment variables** in production:
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`
- `NEXT_PUBLIC_MINIKIT_API_KEY`
- `OPENAI_API_KEY`
- `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS`
- `NFT_MINTER_PRIVATE_KEY`

4. **Test in Base App** to ensure Mini App functionality works correctly

### Farcaster Frame Setup

1. **Create a Farcaster frame** pointing to your deployed app URL
2. **Configure frame metadata** in your app's meta tags
3. **Test frame functionality** in Farcaster clients

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly in Base App environment
5. Submit a pull request

## License

MIT License - see LICENSE file for details
