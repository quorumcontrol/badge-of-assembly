// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { BigNumber, ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { chain } from "wagmi";

const SKL_ADDRESS = "0x00c83aeCC790e8a4453e5dD3B0B4b3680501a7A7";

const mainnetProvider = new ethers.providers.AlchemyProvider(
  chain.mainnet.id,
  process.env.NEXT_PUBLIC_ALCHEMY_KEY
);

const fetchBalance = async (address: string) => {
  console.log('fetch balance for: ', address)
  const balance = await mainnetProvider.send('alchemy_getTokenBalances', [address, [SKL_ADDRESS]])
  return BigNumber.from(balance.tokenBalances[0].tokenBalance)
}

const threshold = parseEther('1000')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<boolean>
) {
  const address = JSON.parse(req.body).address
  const balance = await fetchBalance(address)
  if (balance.gte(threshold)) {
    console.log('would mint')
  }
  res.status(201).json(true);
}
