pragma solidity ^0.5.2;

import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/token/ERC20/ERC20Detailed.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/token/ERC20/ERC20Mintable.sol";

/**
 * ERC20 coin contract.
 *
 * A simple coin.
 */
contract Coin is ERC20Detailed, ERC20Mintable
{
    /**
     * Created a coin.
     */
    event Coined(string indexed symbol);

    /**
     * Initializes the contract.
     */
    constructor() ERC20Detailed("WHU", "WHU", 2) public
    {
        emit Coined("WHU");
    }
}