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
`Usage: node deploy.js gethipc account password solidity address
    gethipc
        the geth IPC file
    account
        the account address
    password
        the account password file
    compiled
        the compiled contract file
    address
        the deployed contract address output file
`;

if(process.argv.length !== 7)
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
    const account = process.argv[3];
    const password = fs.readFileSync(process.argv[4], "utf8");
    const compiled = fs.readFileSync(process.argv[5], "utf8");
    const filename = process.argv[6];
    
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
        fs.writeFileSync(filename, address);
        console.log("saved contract address in file", filename);
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