var account1 = "0xa11cf5fc17ae7e94cef8dff7c8de124be6035034";
var account2 = "0xa12ae55267136559c89677bd15a50eeb448e997f";
var account3 = "0xa139bc4f28a3ee8a6c1fd938e869f99a130db429";
var account4 = "0xa14e70b702cced06e5720886a0e29a01cce8cf17";
var account5 = "0xa155e049c8a8e6b2d80307c5a2cddce121106262";
var account6 = "0xa16ecd74300f253d924019b34c10dcd320cf1ce0";

var balance1 = web3.eth.getBalance(account1);
var balance2 = web3.eth.getBalance(account2);
var balance3 = web3.eth.getBalance(account3);
var balance4 = web3.eth.getBalance(account4);
var balance5 = web3.eth.getBalance(account5);
var balance6 = web3.eth.getBalance(account6);

console.log("Block number", web3.eth.blockNumber);
console.log("Account 1", account1, balanceAccount1, "wei");
console.log("Account 2", account2, balanceAccount2, "wei");
console.log("Account 3", account3, balanceAccount3, "wei");
console.log("Account 4", account4, balanceAccount4, "wei");
console.log("Account 5", account5, balanceAccount5, "wei");
console.log("Account 6", account6, balanceAccount6, "wei");

var tx =
{
    from: account1,
    to: account2,
    value: 12000
};
var txHash = web3.eth.sendTransaction(tx);
console.log("Transaction hash", txHash);
