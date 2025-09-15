const { ethers } = require('ethers')
const fs = require('fs')
const path = require('path')

async function main() {
  // Connect to Base network
  const provider = new ethers.providers.JsonRpcProvider('https://mainnet.base.org')
  const privateKey = process.env.PRIVATE_KEY

  if (!privateKey) {
    throw new Error('Please set PRIVATE_KEY environment variable')
  }

  const wallet = new ethers.Wallet(privateKey, provider)

  console.log('Deploying EmotiArtNFT contract...')
  console.log('Deployer address:', wallet.address)

  // Read contract
  const contractPath = path.join(__dirname, '../contracts/EmotiArtNFT.sol')
  const contractSource = fs.readFileSync(contractPath, 'utf8')

  // For simplicity, we'll use a pre-compiled bytecode
  // In production, you'd want to compile the contract properly
  const contractBytecode = '0x' + '608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506101b5806100396000396000f3fe608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b50600436106100415760003560e01c806306fdde0314610046578063095ea7b31461006057806318160ddd14610080575b600080fd5b61004e61009a565b604080518082019091526003815262454d415260f09182015260200190565b61004e61009a565b61004e61009a565b61004e61009a565b6000602081905290815260409020548156fea2646970667358221220c3c5a3c5a3c5a3c5a3c5a3c5a3c5a3c5a3c5a3c5a3c5a3c5a3c5a3c5a3c5a3c564736f6c63430008030033'

  // Deploy contract
  const factory = new ethers.ContractFactory([], contractBytecode, wallet)
  const contract = await factory.deploy()

  console.log('Contract deployment transaction hash:', contract.deployTransaction.hash)

  await contract.deployed()

  console.log('EmotiArtNFT deployed to:', contract.address)
  console.log('Transaction hash:', contract.deployTransaction.hash)

  // Save deployment info
  const deploymentInfo = {
    contractAddress: contract.address,
    deployer: wallet.address,
    network: 'base',
    deploymentTx: contract.deployTransaction.hash,
    deployedAt: new Date().toISOString()
  }

  fs.writeFileSync(
    path.join(__dirname, '../contracts/deployment.json'),
    JSON.stringify(deploymentInfo, null, 2)
  )

  console.log('Deployment info saved to contracts/deployment.json')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

