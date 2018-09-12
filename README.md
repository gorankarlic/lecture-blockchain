## Lecture Notes

### Prepare environment

Install [NodeJS version 8](https://nodejs.org/en/download/).

### Geth

To download and install [Geth](https://geth.ethereum.org/downloads/) in ```target/geth``` run

On MacOS

```sh
npm run install-macos
```

On Rasperry Pi

```
npm run install-armv7
```

### Run Proof of Authority (PoA) blockchain

Create a new Ethereum PoW blockchain using the genesis block specified in ```src/poa/genesis.json```. It will reside in ```target/geth-data```.

```sh
npm run poa-genesis-1
npm run poa-run-1
```

git clone https://github.com/gorankarlic/lecture-blockchain.git && cd lecture-blockchain && curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - && sudo apt-get install -y nodejs && npm run install-armv7

### Run Proof of Work (PoW) blockchain

Create a new Ethereum PoW blockchain using the genesis block specified in ```src/poa/genesis.json```. It will reside in ```target/geth-data```.

```sh
npm run pow-genesis-1
npm run pow-run-1
```

git clone https://github.com/gorankarlic/lecture-blockchain.git && cd lecture-blockchain && curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - && sudo apt-get install -y nodejs && npm run install-armv7
