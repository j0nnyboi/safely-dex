# serum-dex

## Deploying the DEX

Using the `do.sh` script from the repository's top level directory,

### Run unit tests

```bash
./do.sh test dex
```

### Compile the dex binary

```bash
./do.sh build dex
```

### Deploy the dex to the configured safecoin cluster

```bash
DEX_PROGRAM_ID="$(safecoin deploy dex/target/bpfel-unknown-unknown/release/serum_dex.so | jq .programId -r)"
```

## Run the fuzz tests

```bash
cd dex
cargo install cargo-fuzz
cargo fuzz run multiple_orders
```

## Using the crank client utility

```bash
cd crank

# read the autogenerated help text
cargo run -- help

# supported options are localnet, mainnet, testnet, devnet
CLUSTER=localnet

# verify that you have SAFE balances for gas
KEYPAIR=~/.config/safecoin/id.json
safecoin balance -k $KEYPAIR

# run the demo script (this is mostly a smoke test)
cargo run -- $CLUSTER whole-shebang $KEYPAIR $DEX_PROGRAM_ID

# list a market with the default tick size and minimum quantity.
# if both assets have 6 decimals, this will be a quantity of 1 and a tick size of 0.01
COIN_MINT="..."
PRICE_CURRENCY_MINT="..."
cargo run -- $CLUSTER list-market $KEYPAIR $DEX_PROGRAM_ID --coin-mint $COIN_MINT --pc-mint $PRICE_CURRENCY_MINT
```

## First-time setup

```bash
# Building the dex
sudo apt-get install -y pkg-config build-essential python3-pip jq
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
curl -sSf https://raw.githubusercontent.com/fair-exchange/safecoin/v1.4.14/install/safecoin-install-init.sh | sh -s - v1.4.14
export PATH="/home/ubuntu/.local/share/solana/install/active_release/bin:$PATH"

git clone https://github.com/safely-project/serum-dex
cd serum-dex
./do.sh update
./do.sh build dex

# run a safecoin cluster. in a new shell:
git clone https://github.com/fair-exchange/safecoin --branch v1.4.14
cd solana
sudo apt-get install -y libssl-dev libudev-dev zlib1g-dev llvm clang
cargo build --release
export RUST_LOG=solana_runtime::system_instruction_processor=trace,solana_runtime::message_processor=info,solana_bpf_loader=debug,solana_rbpf=debug
NDEBUG=1 ./run.sh

# Deploy the dex to our cluster (in the old shell)
safecoin config set -u http://127.0.0.1:8328
safecoin-keygen new
safecoin airdrop 100
DEX_PROGRAM_ID="$(safecoin deploy dex/target/bpfel-unknown-unknown/release/serum_dex.so | jq .programId -r)"
CLUSTER=localnet
KEYPAIR=~/.config/safecoin/id.json

# run the demo script (this is mostly a smoke test)
cargo run -- $CLUSTER whole-shebang $KEYPAIR $DEX_PROGRAM_ID
```
