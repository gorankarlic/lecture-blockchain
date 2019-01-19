var account1 = "0xa11cf5fc17ae7e94cef8dff7c8de124be6035034";
var account2 = "0xa12ae55267136559c89677bd15a50eeb448e997f";
var account3 = "0xa139bc4f28a3ee8a6c1fd938e869f99a130db429";
var account4 = "0xa14e70b702cced06e5720886a0e29a01cce8cf17";
var account5 = "0xa155e049c8a8e6b2d80307c5a2cddce121106262";
var account6 = "0xa16ecd74300f253d924019b34c10dcd320cf1ce0";
var account7 = "0xa1771d897379af199c60e37c331f24c74024c5df";

var balance1 = web3.eth.getBalance(account1);
var balance2 = web3.eth.getBalance(account2);
var balance3 = web3.eth.getBalance(account3);
var balance4 = web3.eth.getBalance(account4);
var balance5 = web3.eth.getBalance(account5);
var balance6 = web3.eth.getBalance(account6);
var balance7 = web3.eth.getBalance(account7);

console.log("Block number", web3.eth.blockNumber);
console.log("Account 1", account1, balance1, "wei");
console.log("Account 2", account2, balance2, "wei");
console.log("Account 3", account3, balance3, "wei");
console.log("Account 4", account4, balance4, "wei");
console.log("Account 5", account5, balance5, "wei");
console.log("Account 6", account6, balance6, "wei");
console.log("Account 7", account7, balance7, "wei");

var tx =
{
    from: account5,
    to: account6,
    value: 12000
};
var txHash = web3.eth.sendTransaction(tx);
console.log("Transaction hash", txHash);
