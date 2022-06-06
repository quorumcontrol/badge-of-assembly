import { ethers, BigNumber } from "ethers";
import { chain } from "wagmi";
import { useQuery } from "react-query";
import { Skl__factory } from "../eth-sdk/contracts";
import isTestnet from "./utils/isTestnet";

const TESTNET_BOA = "0x00c83aeCC790e8a4453e5dD3B0B4b3680501a7A7";
const MAINNET_BOA = "0x8D0a8C7c892211fE43ac02Dc81d25a98e1cF3E53";

export const BOA_ADDRESS = isTestnet ? TESTNET_BOA : MAINNET_BOA

const mainnetProvider = new ethers.providers.AlchemyProvider(
  chain.mainnet.id,
  process.env.NEXT_PUBLIC_ALCHEMY_KEY
);

const skl = Skl__factory.connect(BOA_ADDRESS, mainnetProvider);

const useSKLBalance = (address?: string) => {
  const fetchBalance = async () => {
    const [balance, staked] = await Promise.all([
      mainnetProvider.send("alchemy_getTokenBalances", [
        address,
        [BOA_ADDRESS],
      ]),
      skl.callStatic.getAndUpdateDelegatedAmount(address!),
    ]);
    const liquid = BigNumber.from(balance.tokenBalances[0].tokenBalance);
    return {
      staked,
      liquid,
      total: staked.add(liquid),
    };
  };
  return useQuery(["skl-balance", address], fetchBalance, {
    enabled: !!address,
  });
};

export default useSKLBalance;
