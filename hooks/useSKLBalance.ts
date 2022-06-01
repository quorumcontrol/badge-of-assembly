import { ethers, BigNumber } from "ethers";
import { chain } from "wagmi";
import { useQuery } from "react-query"
import { getMainnetSdk } from '@dethcrypto/eth-sdk-client' // yay, our SDK! It's tailored especially for our needs

const SKL_ADDRESS = "0x00c83aeCC790e8a4453e5dD3B0B4b3680501a7A7";

const mainnetProvider = new ethers.providers.AlchemyProvider(
  chain.mainnet.id,
  process.env.NEXT_PUBLIC_ALCHEMY_KEY
);

const sdk = getMainnetSdk(mainnetProvider)

const useSKLBalance = (address?: string) => {
  const fetchBalance = async () => {
    const [balance, staked] = await Promise.all([
      mainnetProvider.send('alchemy_getTokenBalances', [address, [SKL_ADDRESS]]),
      sdk.skl.callStatic.getAndUpdateDelegatedAmount(address!)
    ])
    const liquid = BigNumber.from(balance.tokenBalances[0].tokenBalance)
    return {
      staked,
      liquid,
      total: staked.add(liquid),
    }
  }
  return useQuery(['skl-balance', address], fetchBalance, {
    enabled: !!address
  })
};

export default useSKLBalance;
