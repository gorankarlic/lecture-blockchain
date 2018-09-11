var account1 = "0x1b1bca762dfebdda5d5bbf5e3041fe91b1be609e";
var account2 = "0x2080c4a2acd3c30dee978501e38d44029de32964";
var tx =
{
    from: account1,
    to: account2,
    value: web3.toWei(123, "wei")
};

console.log("Block number", web3.eth.blockNumber);
console.log("Account 1", account1, web3.eth.getBalance(account1), "wei");
console.log("Account 2", account2, web3.eth.getBalance(account2), "wei");

var txHash = web3.eth.sendTransaction(tx);
console.log("Transaction hash", txHash);