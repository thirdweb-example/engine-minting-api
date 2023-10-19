# thirdweb Engine - Minting API Demo

---

## Instructions

1. Deploy Engine and host it on `ENGINE_URL`.

1. Create or import a backend wallet.

   ```bash
   curl -X POST \
       -H "Content-Type: application/json" \
       -H "Authorization: Bearer <THIRDWEB_SECRET_KEY>" \
       -d '{ "privateKey": "01ab..." }' \
       "https://<ENGINE_URL>/backend-wallet/import"
   ```

1. Send gas funds to the backend wallet.

1. Deploy a [thirdweb Edition Drop](https://thirdweb.com/thirdweb.eth/DropERC1155) contract and update the claim condition to allow minting.

   ```bash
    curl -X POST \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer <THIRDWEB_SECRET_KEY>" \
        -H "x-backend-wallet-address: <BACKEND_WALLET_ADDRESS>" \
        -d '{
            "contractMetadata": {
                "name": "Acme Loyalty Card",
                "symbol": "ALC",
                "primary_sale_recipient": "<BACKEND_WALLET_ADDRESS>"
            }
        }' \
        "https://<ENGINE_URL>/deploy/mumbai/prebuilds/edition-drop"
   ```

1. Update the `.env` file.

   ```env
   EDITION_DROP_CONTRACT_ADDRESS=0x...
   ENGINE_URL=https://...
   THIRDWEB_CLIENT_ID=0123...
   THIRDWEB_SECRET_KEY=AaBb...
   ```

1. Start the server locally.

   ```bash
   bun dev
   ```
