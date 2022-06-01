import '@nomiclabs/hardhat-ethers'
import { task } from "hardhat/config";

task('chainprint')
  .setAction(async (_,hre) => {
    const provider = hre.ethers.provider
    console.log(await provider.getNetwork())
  })