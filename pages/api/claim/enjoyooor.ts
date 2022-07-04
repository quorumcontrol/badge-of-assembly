// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers, Wallet } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";
import { BadgeOfAssembly__factory } from "../../../contracts/typechain";
import { skaleMainnet, skaleTestnet } from '../../../hooks/utils/SkaleChains'
import isTestnet from "../../../hooks/utils/isTestnet";
import { BOA_ADDRESS } from "../../../hooks/BadgeOfAssembly";
import { isTxEuropaSkalePurchase } from "../../../hooks/europaChain";

if (!process.env.BADGE_MINTER_PRIVATE_KEY) {
  throw new Error("must have a badge minter private key")
}

const rpcUrl = isTestnet ? skaleTestnet.rpcUrls.default : skaleMainnet.rpcUrls.default

const schainProvider = new ethers.providers.JsonRpcProvider(rpcUrl)
const schainSigner = new Wallet(process.env.BADGE_MINTER_PRIVATE_KEY!).connect(schainProvider)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{transactionId?: string}>
) {
  // return res.status(201).json({});
  const { address, txHash } = JSON.parse(req.body)

  if (await isTxEuropaSkalePurchase(address, txHash)) {
    // fake succeeding transaction:
    // return res.status(201).json({ transactionId: '0xae42443d5b97530465d8a513c19a4f27b25cd7708f37da4d648fda557ced8c9a'})
    const boa = new BadgeOfAssembly__factory(schainSigner).attach(BOA_ADDRESS)
    const tx = await boa.mint(address, 2, 1)
    console.log('ruby badge', 'to', address,'txid: ', tx.hash)
    return res.status(201).json({ transactionId: tx.hash })
  }
  res.status(401);
}


