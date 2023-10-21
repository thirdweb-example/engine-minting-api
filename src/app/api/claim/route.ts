import { NextResponse } from "next/server";

const {
  BACKEND_WALLET_ADDRESS,
  NFT_CONTRACT_ADDRESS,
  ENGINE_URL,
  THIRDWEB_SECRET_KEY,
} = process.env;

export async function POST(request: Request) {
  if (
    !BACKEND_WALLET_ADDRESS ||
    !NFT_CONTRACT_ADDRESS ||
    !ENGINE_URL ||
    !THIRDWEB_SECRET_KEY
  ) {
    throw 'Server misconfigured. Did you forget to add a ".env.local" file?';
  }

  const { userWalletAddress } = await request.json();

  const resp = await fetch(
    `${ENGINE_URL}/contract/mumbai/${NFT_CONTRACT_ADDRESS}/erc1155/mint-to`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${THIRDWEB_SECRET_KEY}`,
        "x-backend-wallet-address": BACKEND_WALLET_ADDRESS,
      },
      body: JSON.stringify({
        receiver: userWalletAddress,
        metadataWithSupply: {
          metadata: {
            name: "Acme Inc. Superfan",
            description: "Created with thirdweb Engine",
            image:
              "ipfs://QmciR3WLJsf2BgzTSjbG5zCxsrEQ8PqsHK7JWGWsDSNo46/nft.png",
          },
          supply: "1",
        },
      }),
    }
  );
  if (resp.ok) {
    console.log("[DEBUG] ok", await resp.json());
  } else {
    console.log("[DEBUG] not ok", await resp.text());
  }

  return NextResponse.json({ message: "Success!" });
}
