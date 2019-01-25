"use strict";

const fs = require("fs");
const net = require("net");
const readline = require("readline-sync");
const util = require("util");
const Web3 = require("web3");

/**
 * Mint some coins.
 */
async function main()
{
    const gethipc = process.argv[2];
    const account = process.argv[3];
    const password = fs.readFileSync(process.argv[4], "utf8");
    const compiled = fs.readFileSync(process.argv[5], "utf8");
    //const address = fs.readFileSync(process.argv[6], "utf8");

    const {abi} = JSON.parse(compiled);
    const web3 = new Web3(gethipc, net);
    
    const balance = await web3.eth.getBalance(account);
    console.log("account balance", account, balance, "wei");
    const unlocked = await web3.eth.personal.unlockAccount(account, password, 60);
    console.log("account unlocked", account, unlocked);

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
        from: account,
        gas: 4700000,
        gasPrice: 0
    };
    const receipt = await contract.methods.mint(account, amount).send(opts);
    console.log("received receipt", receipt);
    const coins = await contract.methods.balanceOf(account).call();
    const symbol = await contract.methods.symbol().call();
    console.log("account balance", coins, symbol);
    process.exit(0);
}

Promise.resolve(main()).catch(console.log);