# Lecture Notes

## Prepare environment

### Prepare in one command

Execute all steps below in one line.

```sh
apt-get update && curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash - && apt-get install -y build-essential git-core nodejs && git clone https://github.com/gorankarlic/lecture-blockchain.git ~/lecture-blockchain && npm -C ~/lecture-blockchain install && npm -C ~/lecture-blockchain run install-linux
```

### Prepare environment (step by step)

#### Clone repository

Clone this [git](https://git-scm.com) repository.

```sh
git clone https://github.com/gorankarlic/lecture-blockchain.git ~/lecture-blockchain
```

If you want to learn and play more with **git** you may want to try [GitKraken](https://www.gitkraken.com).

#### Install NodeJS

Install [NodeJS](https://nodejs.org/en/download/).

```sh
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash - && sudo apt-get install -y nodejs
```

#### Install Geth

Download and install [Geth](https://geth.ethereum.org/downloads/) in ```target/geth```

- On Rasperry Pi run

    ```
    cd ~/lecture-blockchain
    npm run install-armv7
    ```

- On MacOS run

    ```sh
    cd ~/lecture-blockchain
    npm run install-macos
    ```

## Run blockchain

### Run Proof of Authority (PoA) blockchain

Create a new Ethereum PoA blockchain using the genesis block specified in ```src/poa/genesis.json``` (it will recreate the folder```target/geth-data```). Run

```sh
cd ~/lecture-blockchain
npm run poa-genesis-1
npm run poa-run-1
```

### Run Proof of Work (PoW) blockchain

Create a new Ethereum PoW blockchain using the genesis block specified in ```src/poa/genesis.json``` (it will recreate the folder ```target/geth-data```). Run

```sh
cd ~/lecture-blockchain
npm run pow-genesis-1
npm run pow-run-1
```

### Coin contract

#### Compile contract

To compile the [coin solidity contract](https://github.com/gorankarlic/lecture-blockchain/blob/master/src/contract/coin/Coin.sol), run

```sh
cd ~/lecture-blockchain
npm run compile-contract-coin
```

#### Deploy contract

Make sure you are running a PoW blockchain and have compiled the contract.

```sh
cd ~/lecture-blockchain
npm run pow-deploy-coin-1
```

#### Mint coins

Make sure you are running a PoW blockchain and have deployed the contract.

To mint some coins into your wallet, run 

```sh
cd ~/lecture-blockchain
npm run pow-deploy-coin-1
```

#### Transfer coins

Make sure you are running a PoW blockchain and have minted some coins.

To transfer some coins into another teams wallet, run 

```sh
cd ~/lecture-blockchain
npm run pow-pay-1
```

#### Running on a PoA blockchain

Substitute the `pow-` prefix with `poa` in each step to run it on a PoA blockchain.

### Vote contract

#### Compile contract

To compile the [vote solidity contract](https://github.com/gorankarlic/lecture-blockchain/blob/master/src/contract/vote/Vote.sol), run

```sh
cd ~/lecture-blockchain
npm run compile-contract-vote
```

#### Deploy contract

Make sure you are running a PoW blockchain and have compiled the contract.

```sh
cd ~/lecture-blockchain
npm run pow-deploy-vote-1
```

#### Vote

Make sure you are running a PoW blockchain and have deployed the contract.

To register a vote, run 

```sh
cd ~/lecture-blockchain
npm run pow-vote-1
```

#### Transfer coins

Make sure you are running a PoW blockchain and have minted some coins.

To transfer some coins into another teams wallet, run 

```sh
cd ~/lecture-blockchain
npm run pow-pay-1
```
