"use strict";

const child_process = require("child_process");
const fs = require("fs");
const net = require("net");
const os = require("os");
const path = require("path");
const solc = require("solc");

/**
 * Usage instructions.
 * 
 * @type String
 */
const USAGE =
`Usage: node compile.js srcfile outfile
    srcfile
        the solidity contract source file
    outfile
        the compiled contract output file
`;

if(process.argv.length !== 4)
{
   process.stdout.write(USAGE);
   process.exit(1);
}

/**
 * Import URL to temporary file name mapping.
 * 
 * @type Map
 */
const IMPORTS = {};

/**
 * Temporary directory.
 * 
 * @type String
 */
const TEMPDIR = fs.mkdtempSync(`${os.tmpdir()}/imports`);

/**
 * Imports a remote solidity file.
 * 
 * @param {String} url the URL of the file to import.
 */
function imports(url)
{
    let file = IMPORTS[url];
    if(file === void null)
    {
        file = Math.random().toString(36);
        console.log("downloading", url, file);
        child_process.execSync(`curl -s -o ${TEMPDIR}/${file} ${url}`);
        IMPORTS[url] = file;
    }
    const contents = fs.readFileSync(`${TEMPDIR}/${file}`, "utf-8");
    return {contents};
};

/**
 * Compile a solidity contract.
 */
function main()
{
    const srcfile = process.argv[2];
    const outfile = process.argv[3];
    
    const basename = path.basename(srcfile);
    const content = fs.readFileSync(srcfile, "utf8");

    const sources = {};
    sources[basename] = {content};

    const input =
    {
        language: "Solidity",
        sources: sources,
        settings:
        {
            outputSelection:
            {
                "*": {"*": ["*"]}
            }
        }
    };

    const compiled = JSON.parse(solc.compile(JSON.stringify(input), imports));
    if(compiled.errors)
    {
        console.log("failed to compile contract", compiled.errors[0]);
        process.exit(1);
    }
    else
    {
        const contracts = compiled.contracts;
        const contract = contracts[basename];
        const classes = Object.keys(contract);
        const classname = classes[0];
        const main = contract[classname];
        console.log("contract compiled");
        fs.writeFileSync(outfile, JSON.stringify(main, null, 4));
        console.log("saved compiled contract in file", outfile);
        process.exit(0);
    }
}

main();