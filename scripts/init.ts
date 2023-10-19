const args = process.argv.slice(2); // Exclude "node <scriptName>"

const { ENGINE_URL, THIRDWEB_SECRET_KEY } = process.env;

async function main() {
  // Create a backend wallet.
  const { walletAddress: backendWalletAddress } = await createBackendWallet();

  // Deploy an Edition Drop contract.
  const { deployedAddress } = await deployEditionDrop(backendWalletAddress);

  // @TODO: wait until deployed.

  // Add a token.
  await lazyMintToken(deployedAddress, backendWalletAddress);

  // Update the claim condition.
  await setClaimConditions();
}
await main();

const createBackendWallet = async (): Promise<{
  walletAddress: string;
  status: string;
}> => {
  const resp = await fetch(`${ENGINE_URL}/backend-wallet/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${THIRDWEB_SECRET_KEY}`,
    },
  });
  const json = await resp.json();
  return json.result;
};

const deployEditionDrop = async (
  backendWalletAddress: string
): Promise<{
  queueId: string;
  deployedAddress: string;
}> => {
  const resp = await fetch(
    `${ENGINE_URL}/deploy/mumbai/prebuilts/edition-drop`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${THIRDWEB_SECRET_KEY}`,
        "x-backend-wallet-address": backendWalletAddress,
      },
      body: JSON.stringify({
        contractMetadata: {
          name: "Acme Inc. Loyalty Card",
          symbol: "ALC",
          primary_sale_recipient: backendWalletAddress,
        },
      }),
    }
  );
  const json = await resp.json();
  return json.result;
};

const lazyMintToken = async (
  deployedAddress: string,
  backendWalletAddress: string
): Promise<{
  queueId: string;
}> => {
  const resp = await fetch(
    `${ENGINE_URL}/contract/mumbai/${deployedAddress}/erc1155/lazy-mint`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${THIRDWEB_SECRET_KEY}`,
        "x-backend-wallet-address": backendWalletAddress,
      },
      body: JSON.stringify({
        metadatas: [
          {
            name: "Acme Superfans",
            description: "Simple minting with thirdweb Engine",
            image:
              "ipfs://QmciR3WLJsf2BgzTSjbG5zCxsrEQ8PqsHK7JWGWsDSNo46/nft.png",
          },
        ],
      }),
    }
  );
  const json = await resp.json();
  return json.result;
};
