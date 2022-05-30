// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";


contract BadgeOfAssembly is ERC1155URIStorage {

    

    constructor() ERC1155("https://badge-of-assembly.netlify.app/api/boa/{id}.json") {

    }

    function contractURI() public view returns (string memory) {
        return "https://badge-of-assembly.netlify.app/api/boa";
    }
}