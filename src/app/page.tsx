"use client";
import {
  ConnectWallet,
  ThirdwebProvider,
  useAddress,
} from "@thirdweb-dev/react";

export default function Home() {
  return (
    <ThirdwebProvider
      activeChain="mumbai"
      clientId={process.env.THIRDWEB_CLIENT_ID}
    >
      <ClaimPage />
    </ThirdwebProvider>
  );
}

function ClaimPage() {
  const userWalletAddress = useAddress();

  const onClick = async () => {
    const resp = await fetch("/api/claim", {
      method: "POST",
      body: JSON.stringify({ userWalletAddress }),
    });
    if (resp.ok) {
    } else {
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2 className="">Claim your reward</h2>
      <ConnectWallet />
      {userWalletAddress && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          onClick={onClick}
        >
          Claim
        </button>
      )}
    </main>
  );
}
