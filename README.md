# Payment Getaway
This is the payment gateway of Carbonable.
Its aims is to validate offchain payment and airdrop projects' assets to users' wallet.

## Pre-requisite
### Environment variable
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_SECRET_KEY_TEST=your-stripe-secret-key-test

ARGENT_WALLET_PK=argent-wallet-private-key
ARGENT_WALLET_ADDRESS=argent-wallet-address

NODE_URL=rpc_url
RPC_API_KEY=rpc_api_key

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Swagger
```bash
http://localhost:3000/api
```

## License
[Apache licensed](LICENSE).
