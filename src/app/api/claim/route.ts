import { NextResponse } from "next/server";

const { EDITION_DROP_CONTRACT_ADDRESS, ENGINE_URL, THIRDWEB_SECRET_KEY } =
  process.env;

export async function POST(request: Request) {
  const { userWalletAddress } = await request.json();

  const backendWalletAddress = await getBackendWallet();
  claimReward(userWalletAddress, backendWalletAddress);

  return NextResponse.json({ message: "Success!" });
}

const getBackendWallet = async (): Promise<string> => {
  const resp = await fetch(`${ENGINE_URL}/backend-wallet/get-all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${THIRDWEB_SECRET_KEY}`,
    },
  });
  const json = await resp.json();

  const backendWallet = json.result[0]?.address;
  if (!backendWallet) {
    throw "No backend wallet created yet.";
  }
  return backendWallet;
};

const claimReward = async (
  userWalletAddress: string,
  backendWalletAddress: string
): Promise<void> => {
  await fetch(
    `${ENGINE_URL}/contract/mumbai/${EDITION_DROP_CONTRACT_ADDRESS}/erc1155/claim-to`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${THIRDWEB_SECRET_KEY}`,
        "x-backend-wallet-address": backendWalletAddress,
      },
      body: JSON.stringify({
        receiver: userWalletAddress,
        token_id: "0",
        quantity: "1",
      }),
    }
  );
};
