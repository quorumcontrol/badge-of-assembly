// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { BigNumber, ethers, Wallet } from "ethers";
import { parseEther } from "ethers/lib/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { chain } from "wagmi";
import { Skl__factory } from '../../../eth-sdk/contracts'
import { BadgeOfAssembly__factory } from "../../../contracts/typechain";
import { skaleMainnet, skaleTestnet } from '../../../hooks/utils/SkaleChains'
import { SKL_ADDRESS } from "../../../hooks/useSKLBalance";
import isTestnet from "../../../hooks/utils/isTestnet";
import { BOA_ADDRESS } from "../../../hooks/BadgeOfAssembly";

if (!process.env.BADGE_MINTER_PRIVATE_KEY) {
  throw new Error("must have a badge minter private key")
}

const rpcUrl = isTestnet ? skaleTestnet.rpcUrls.default : skaleMainnet.rpcUrls.default

const schainProvider = new ethers.providers.JsonRpcProvider(rpcUrl)
const schainSigner = new Wallet(process.env.BADGE_MINTER_PRIVATE_KEY!).connect(schainProvider)

const hasTransacted = async (address: string) => {
  const resp = await fetch(`https://elated-tan-skat.explorer.mainnet.skalenodes.com/api?module=account&action=txlist&address=${address}`)
  if (resp.status !== 200) {
    throw new Error('bad response')
  }
  const result = await resp.json()
  return result.result.length > 0
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{transactionId?: string}>
) {
  // return res.status(201).json({});
  const address = JSON.parse(req.body).address

  if (await hasTransacted(address)) {
    // fake succeeding transaction:
    // return res.status(201).json({ transactionId: '0xae42443d5b97530465d8a513c19a4f27b25cd7708f37da4d648fda557ced8c9a'})
    const boa = new BadgeOfAssembly__factory(schainSigner).attach(BOA_ADDRESS)
    const tx = await boa.mint(address, 3, 1)
    console.log('ruby badge', 'to', address,'txid: ', tx.hash)
    return res.status(201).json({ transactionId: tx.hash })
  }
  res.status(401);
}
