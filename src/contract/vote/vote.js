"use strict";

const fs = require("fs");
const net = require("net");
const readline = require("readline-sync");
const Web3 = require("web3");

/**
 * Submits a vote.
 */
async function main()
{
    const gethipc = process.argv[2];
    const compiled = fs.readFileSync(process.argv[3], "utf8");
    const account = process.argv[4];
    const password = fs.readFileSync(process.argv[5], "utf8");

    const {abi} = JSON.parse(compiled);
    const web3 = new Web3(gethipc, net);
    
    const balance = await web3.eth.getBalance(account);
    console.log("account balance", balance, "wei");
    const unlocked = web3.eth.personal.unlockAccount(account, password, 60);
    console.log("account unlocked", account);

    const event = web3.utils.sha3("Voting");
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
    const voted = await contract.methods.voted(account).call();
    if(voted)
    {
        console.log("already voted");
    }
    else
    {
        const opts = {falseValue: "no", trueValue: "yes"};
        let answer;
        do
        {
            answer = readline.question("Vote 'yes' or 'no'? ", opts);
        }
        while(typeof answer !== "boolean");
        const receipt = await contract.methods.vote(answer).send({from: account});
        console.log("received receipt", receipt);
    }
    const count = await contract.methods.count().call();
    console.log("vote count", count);
    const spent = balance - await web3.eth.getBalance(account);
    console.log("spent", spent, "wei");
    process.exit(0);
}

Promise.resolve(main()).catch(console.log);