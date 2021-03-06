pragma solidity ^0.5.2;

/**
 * Vote contract.
 *
 * Any address can place a yes/no vote only once.
 */
contract Vote
{
    /**
     * Created a vote.
     */
    event Voting();

    /**
     * Number of Yes vs. No votes.
     */
    int private counter;

    /**
     * Indicates if a voter has voted.
     */
    mapping(address => bool) private voters;

    /**
     * Initializes the contract.
     */
    constructor() public
    {
        emit Voting();
    }

    /**
     * Counts the number of Yes vs. No votes.
     *
     * @return the number of Yes vs. No votes.
     */
    function count() public view returns(int)
    {
        return counter;
    }

    /**
     * Submits a vote.
     *
     * @param yes the Yes or No vote.
     */
    function vote(bool yes) public
    {
        require(voters[msg.sender] != true);
        voters[msg.sender] = true;
        if(yes)
        {
            counter++;
        }
        else
        {
            counter--;
        }
    }

    /**
     * Tests if a voter has already voted.
     *
     * @param voter the voter address.
     * @return a value indicating if the voter has already voted.
     */
    function voted(address voter) public view returns(bool)
    {
        return voters[voter];
    }
}