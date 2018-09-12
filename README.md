# Lecture Notes

## Prepare environment

### Clone repository

Clone this [git]() repository.

```sh
git clone https://github.com/gorankarlic/lecture-blockchain.git
```

### Install NodeJS

Install [NodeJS version 8](https://nodejs.org/en/download/).

```sh
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - && sudo apt-get install -y nodejs
```

### Geth

Download and install [Geth](https://geth.ethereum.org/downloads/) in ```target/geth```

- On Rasperry Pi run

    ```
    npm run install-armv7
    ```

- On MacOS run

    ```sh
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