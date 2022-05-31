import "@nomiclabs/hardhat-ethers";
import { constants } from "ethers";
import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const minterContractAddress = "0xB788d5C6eA489DB4671d78B19717e983F2248219";

async function getBadgeOfAssemblyContract(hre: HardhatRuntimeEnvironment) {
  const { BadgeOfAssembly__factory } = await import("../typechain");

  const signer = (await hre.ethers.getSigners())[0];

  return BadgeOfAssembly__factory.connect(minterContractAddress, signer);
}

task("mint")
  .addParam("name", "name of the badge")
  .addParam("description")
  .addParam("image")
  .addOptionalParam("animationUrl")
  .addOptionalParam("youtubeUrl")
  .setAction(
    async ({ name, description, image, animationUrl, youtubeUrl }, hre) => {
      const boa = await getBadgeOfAssemblyContract(hre);
      const tx = await boa.setup(
        {
          name,
          description,
          image,
          animationUrl,
          youtubeUrl,
          minter: constants.AddressZero,
        },
        1
      );
      console.log("tx id: ", tx.hash);
      const receipt = await tx.wait();
      console.log(receipt);
    }
  );

task("metadata")
  .addParam("tokenId", "the id to fetch for metadata")
  .setAction(async ({ tokenId }, hre) => {
    const boa = await getBadgeOfAssemblyContract(hre);
    const meta = await boa.uri(tokenId);
    console.log(meta);
  });
