// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract EmotiArtNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    struct Artwork {
        string emotion;
        string style;
        string imageUrl;
        uint256 createdAt;
        address creator;
    }

    mapping(uint256 => Artwork) public artworks;

    event ArtworkMinted(uint256 indexed tokenId, address indexed creator, string emotion, string style);

    constructor() ERC721("EmotiArt", "EMART") {}

    function mintArtwork(
        address to,
        string memory emotion,
        string memory style,
        string memory imageUrl,
        string memory tokenURI
    ) public returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);

        artworks[tokenId] = Artwork({
            emotion: emotion,
            style: style,
            imageUrl: imageUrl,
            createdAt: block.timestamp,
            creator: to
        });

        emit ArtworkMinted(tokenId, to, emotion, style);

        return tokenId;
    }

    function getArtwork(uint256 tokenId) public view returns (Artwork memory) {
        require(_exists(tokenId), "Artwork does not exist");
        return artworks[tokenId];
    }

    function getCreator(uint256 tokenId) public view returns (address) {
        require(_exists(tokenId), "Artwork does not exist");
        return artworks[tokenId].creator;
    }

    function getEmotion(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "Artwork does not exist");
        return artworks[tokenId].emotion;
    }

    function getStyle(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "Artwork does not exist");
        return artworks[tokenId].style;
    }

    // Override functions
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}

