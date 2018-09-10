## Lecture Notes

### Prepare environment

Install [NodeJS version 8](https://nodejs.org/en/download/).

### Geth

To download and install [Geth](https://geth.ethereum.org/downloads/) in ```target/geth``` run on MacOS:

```sh
npm run install-geth-macos
```

On Windows:

```
npm run install-geth-windows
```

### Create blockchain

Create a new Ethereum blockchain using the genesis block specified in ```src/geth/genesis.json```. It will reside in ```target/geth-data```.

```sh
npm run geth-init
```