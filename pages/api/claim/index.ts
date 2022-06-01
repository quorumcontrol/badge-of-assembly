// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { BigNumber, ethers, Wallet } from "ethers";
import { parseEther } from "ethers/lib/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { chain } from "wagmi";
import { getMainnetSdk } from '@dethcrypto/eth-sdk-client' // yay, our SDK! It's tailored especially for our needs
import { BadgeOfAssembly__factory } from "../../../contracts/typechain";
import { BADGE_OF_ASSEMBLY_ADDRESS } from "../../../hooks/BadgeOfAssembly";
import { skaleTestnet } from '../../../hooks/utils/SkaleChains'

const SKL_ADDRESS = "0x00c83aeCC790e8a4453e5dD3B0B4b3680501a7A7";

const mainnetProvider = new ethers.providers.AlchemyProvider(
  chain.mainnet.id,
  process.env.NEXT_PUBLIC_ALCHEMY_KEY
);

if (!process.env.BADGE_MINTER_PRIVATE_KEY) {
  throw new Error("must have a badge minter private key")
}

const sdk = getMainnetSdk(mainnetProvider)

const schainProvider = new ethers.providers.JsonRpcProvider(skaleTestnet.rpcUrls.default)
const schainSigner = new Wallet(process.env.BADGE_MINTER_PRIVATE_KEY!).connect(schainProvider)

const fetchBalance = async (address: string) => {
  console.log('fetch balance for: ', address)
  const balance = await mainnetProvider.send('alchemy_getTokenBalances', [address, [SKL_ADDRESS]])
  return BigNumber.from(balance.tokenBalances[0].tokenBalance)
}

const threshold = parseEther('1000')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{transactionId: string}>
) {
  const address = JSON.parse(req.body).address
  const [balance,stakedBalance] = await Promise.all([
    fetchBalance(address),
    sdk.skl.callStatic.getAndUpdateDelegatedAmount(address),
  ])
  if (balance.add(stakedBalance).gte(threshold)) {
    // fake succeeding transaction:
    // return res.status(201).json({ transactionId: '0xae42443d5b97530465d8a513c19a4f27b25cd7708f37da4d648fda557ced8c9a'})
    const boa = new BadgeOfAssembly__factory(schainSigner).attach(BADGE_OF_ASSEMBLY_ADDRESS)
    const tx = await boa.mint(address, 1, 1)
    console.log('to', address,'txid: ', tx.hash)
    return res.status(201).json({ transactionId: tx.hash })
  }
  res.status(401);
}
