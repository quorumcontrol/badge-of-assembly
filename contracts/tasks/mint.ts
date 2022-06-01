import "@nomiclabs/hardhat-ethers";
import { constants } from "ethers";
import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { address as minterContractAddress } from "../deployments/skaletest/BadgeOfAssembly.json";

async function getBadgeOfAssemblyContract(hre: HardhatRuntimeEnvironment) {
  const { BadgeOfAssembly__factory } = await import("../typechain");

  const signer = (await hre.ethers.getSigners())[0];

  return BadgeOfAssembly__factory.connect(minterContractAddress, signer);
}

task("setup")
  .addParam("name", "name of the badge")
  .addParam("description")
  .addParam("image")
  .addOptionalParam("animationUrl")
  .addOptionalParam("youtubeUrl")
  .addOptionalParam("maxPerWallet")
  .setAction(
    async (
      { name, description, image, animationUrl, youtubeUrl, maxPerWallet },
      hre
    ) => {
      const boa = await getBadgeOfAssemblyContract(hre);
      const tx = await boa.setup(
        {
          name,
          description,
          image,
          animationUrl,
          youtubeUrl: youtubeUrl || "",
          maxPerWallet: maxPerWallet || 0,
        },
        1
      );
      console.log("tx id: ", tx.hash);
      const receipt = await tx.wait();
      console.log(receipt);
    }
  );

task("mint", "mint existing badges to new users")
  .addParam("id", "the token id of the badge")
  .addParam("to", "address to send")
  .addOptionalParam("amount", "number of tokens")
  .setAction(async ({ id, to, amount }, hre) => {
    const boa = await getBadgeOfAssemblyContract(hre);
    const tx = await boa.mint(to, id, amount || 1);
    console.log("tx id: ", tx.hash);
    const receipt = await tx.wait();
    console.log(receipt);
  });

task("metadata")
  .addParam("tokenId", "the id to fetch for metadata")
  .setAction(async ({ tokenId }, hre) => {
    const boa = await getBadgeOfAssemblyContract(hre);
    const meta = await boa.uri(tokenId);
    console.log(meta);
  });
