"use strict";

const fs = require("fs");
const net = require("net");
const Web3 = require("web3");

/**
 * Usage instructions.
 * 
 * @type String
 */
const USAGE =
`Usage: node list.js gethipc
    gethipc
        the geth IPC file
`;

if(process.argv.length !== 3)
{
   process.stdout.write(USAGE);
   process.exit(1);
}

/**
 * Deploy a compiled solidity contract via Geth IPC call.
 */
async function main()
{
    const gethIPC = process.argv[2];
    
    const web3 = new Web3(gethIPC, net);
    const number = await web3.eth.getBlockNumber();
    console.log("blockchain has", number, "blocks");
    const event = web3.utils.sha3("Coined(string)");
    const symbol = web3.utils.sha3("WHU");
    const opts =
    {
        fromBlock: 1,
        toBlock: "latest",
        topics: [event, symbol]
    };
    const logs = await web3.eth.getPastLogs(opts);
    const addresses = logs.map(({address}) => address);
    console.log(addresses);
    for(let n = 0; n < number; n++)
    {
        const block = await web3.eth.getBlock(n, true);
        if(block.transactions.length > 0)
        {
            console.log(block);
        }
    }
    process.exit(0);
}

Promise.resolve(main()).catch(console.log);