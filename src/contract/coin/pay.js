"use strict";

const fs = require("fs");
const net = require("net");
const readline = require("readline-sync");
const util = require("util");
const Web3 = require("web3");

/**
 * Pay some coins to an address.
 */
async function main()
{
    const gethipc = process.argv[2];
    const compiled = fs.readFileSync(process.argv[3], "utf8");
    const account1 = process.argv[4];
    const password = fs.readFileSync(process.argv[5], "utf8");
    const account2 = process.argv[6];

    const {abi} = JSON.parse(compiled);
    const web3 = new Web3(gethipc, net);
    
    const unlocked = await web3.eth.personal.unlockAccount(account1, password, 60);
    console.log("account unlocked", account1, unlocked);

    const event = web3.utils.sha3("Coined(string)");
    const signature = web3.utils.sha3("WHU");
    const search =
    {
        fromBlock: 1,
        toBlock: "latest",
        topics: [event, signature]
    };
    const logs = await web3.eth.getPastLogs(search);
    const addresses = logs.map(({address}) => address);
    if(addresses.length === 0)
    {
        console.log("contract not deployed yet");
        process.exit(1);
    }
    
    const address = addresses[0];
    const contract = new web3.eth.Contract(abi, address);
    const amount = readline.questionInt("Amount? ");
    const opts =
    {
        from: account1,
        gas: 4700000,
        gasPrice: 0
    };
    const receipt = await contract.methods.transfer(account2, amount).send(opts);
    console.log("received receipt", receipt);
    
    const coins1 = await contract.methods.balanceOf(account1).call();
    const coins2 = await contract.methods.balanceOf(account2).call();
    const symbol = await contract.methods.symbol().call();
    console.log("account balance", account1, coins1, symbol);
    console.log("account balance", account2, coins2, symbol);
    process.exit(0);
}

Promise.resolve(main()).catch(console.log);