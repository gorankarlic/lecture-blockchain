var account1 = "0x1b1bca762dfebdda5d5bbf5e3041fe91b1be609e";
var account2 = "0x2080c4a2acd3c30dee978501e38d44029de32964";
var tx =
{
    from: account1,
    to: account2,
    value: 123
};

var balanceAccount1 = web3.eth.getBalance(account1);
var balanceAccount2 = web3.eth.getBalance(account2);

console.log("Block number", web3.eth.blockNumber);
console.log("Account 1", account1, balanceAccount1, "wei")
console.log("Account 2", account2, balanceAccount2, "wei")

var txHash = web3.eth.sendTransaction(tx);
console.log("Transaction hash", txHash);
