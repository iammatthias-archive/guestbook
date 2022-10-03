//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

import './Renderer.sol';

/*

▀█▀ █░█ █▀▀
░█░ █▀█ ██▄

█▀▀ █░█ █▀▀ █▀ ▀█▀   █▄▄ █▀█ █▀█ █▄▀
█▄█ █▄█ ██▄ ▄█ ░█░   █▄█ █▄█ █▄█ █░█

*/

contract TheGuestBook is ERC721, Ownable {
  event hello();

  constructor() ERC721('The Guest Book', 'GUEST') {
    emit hello();
  }

  // Emitted when we know that something about the token has changed
  event MetadataUpdated(uint256 indexed tokenId);
  event GuestUpdated(uint256 indexed guestId);

  // Define tokenId
  uint256 public tokenId;

  // Store renderer as separate contract so we can update it if needed
  Renderer public renderer;

  // Store content
  mapping(uint256 => string[]) _tokenMetadata;

  // Guest data
  struct Guest {
    string guest; // The address of the guest.
    string message; // The message the guest sent.
    string timestamp; // The timestamp when the guest visited.
  }

  // Emitted when a new guest is recorded
  event NewGuest(string author, string message, string timestamp);

  Guest[] public guests;

  /// @notice returns all guests
  function getAllGuests() public view returns (Guest[] memory) {
    return guests;
  }

  function addGuest(string memory _m) private {
    // struct the guest values
    string memory _a = Strings.toHexString(uint256(uint160(msg.sender))); // address as string
    string memory _t = Strings.toString(block.number); // block number as string

    // emit event for new guest
    Guest memory g = Guest(_a, _m, _t);
    guests.push(g);
    emit NewGuest(_a, _m, _t);

    _tokenMetadata[tokenId] = [_a, _m];
  }

  /// @notice write a message to the blockchain and get an nft
  /// @notice recommend less than 280 characters
  function mint(string memory _m) public {
    bytes memory _mBytes = bytes(_m);
    require(
      _mBytes.length <= 140,
      'Message should be less than 140 characters.'
    );

    require(
      testStr(_mBytes),
      'Message contains invalid characters. Allowed: [0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.," "]'
    );

    addGuest(_m);
    _mint(msg.sender, tokenId);
    tokenId++;
  }

  // validate message input
  function testStr(bytes memory str) internal pure returns (bool) {
    for (uint256 i; i < str.length; i++) {
      bytes1 char = str[i];
      if (
        !(char >= 0x30 && char <= 0x39) && //9-0
        !(char >= 0x41 && char <= 0x5A) && //A-Z
        !(char >= 0x61 && char <= 0x7A) && //a-z
        !(char == 0x2E) && //.
        !(char == 0x2C) && //,
        !(char == 0x20) //space
      ) return false;
    }
    return true;
  }

  function tokenURI(uint256 _tokenId)
    public
    view
    override
    returns (string memory)
  {
    return renderer.render(_tokenId, _tokenMetadata[_tokenId]);
  }

  /* ADMIN */
  // @notice admin reserves the right to rewrite any message that contains hurtful or inflammatory language
  function rewriteMessage(uint256 _guestId, string calldata _m)
    external
    onlyOwner
  {
    // struct the updated guest message
    guests[_guestId].message = _m;
    emit GuestUpdated(_guestId);
  }

  function withdrawAll() external onlyOwner {
    payable(owner()).transfer(address(this).balance);
  }

  function withdrawAllERC20(IERC20 _erc20Token) external onlyOwner {
    _erc20Token.transfer(owner(), _erc20Token.balanceOf(address(this)));
  }

  function setRenderer(Renderer _renderer) external onlyOwner {
    renderer = _renderer;
    emit MetadataUpdated(type(uint256).max);
  }
}
