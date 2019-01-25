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
`Usage: node deploy.js gethipc compiled account password
    gethipc
        the geth IPC file
    compiled
        the compiled contract file
    account
        the account address
    password
        the account password file
`;

if(process.argv.length !== 6)
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
    const compiled = fs.readFileSync(process.argv[3], "utf8");
    const account = process.argv[4];
    const password = fs.readFileSync(process.argv[5], "utf8");
    
    const code = JSON.parse(compiled);
    const abi = code.abi;
    const bytecode = code.evm.bytecode.object;
    
    const web3 = new Web3(gethIPC, net);
    const balance = await web3.eth.getBalance(account);
    console.log("account balance", account, balance, "wei");
    const unlocked = await web3.eth.personal.unlockAccount(account, password, 60);
    console.log("account unlocked", account, unlocked);

    const opts =
    {
        from: account,
        gas: 4700000,
        gasPrice: 0
    };
    const contract = new web3.eth.Contract(abi);    
    const deploy = contract.deploy({data: "0x" + bytecode, arguments: []}).send(opts);
    deploy.on("receipt", (receipt) =>
    {
        console.log("received receipt", receipt);
        const address = receipt.contractAddress;
        console.log("contract deployed at", address);
        process.exit(0);
    });
    try
    {
        await deploy;
    }
    catch(e)
    {
        console.log("failed to deploy contract", e);
        process.exit(1);
    }
}

Promise.resolve(main()).catch(console.log);