import type { NextPage } from "next";
import type { FC } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useConnect } from "wagmi";

const Home: NextPage = () => {
  const { address, connector } = useAccount();
  if (connector) {
    console.log(address, connector.name);
  }

  return (
    <div className="py-6 justify-center text-center">
      <div className="flex justify-center">
        <ConnectButton />
      </div>

      {connector && (
        <div className="flex flex-col gap-y-3 mt-5">
          <p>Welcome to DePub</p>
          <code className="bg-zinc-700 max-w-fit mx-auto text-zinc-200 p-4 rounded block">
            <pre>{address}</pre>
          </code>
        </div>
      )}
    </div>
  );
};

export default Home;
