import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { constants } from "ethers";
import { ethers } from "hardhat";
import {
  BadgeOfAssembly__factory,
  MetadataPrinter__factory,
} from "../typechain";

describe("BadgeOfAssembly", function () {
  let deployer: SignerWithAddress;

  it("creates", async function () {
    const accts = await ethers.getSigners();
    deployer = accts[0];

    const MetadataPrinterFactory = new MetadataPrinter__factory(deployer);
    const metadataPrinter = await MetadataPrinterFactory.deploy();
    await metadataPrinter.deployed();
    const BadgeOfAssemblyFactory = new BadgeOfAssembly__factory(deployer);
    const boa = await BadgeOfAssemblyFactory.deploy(metadataPrinter.address);
    await boa.deployed();
    await boa.setup(
      {
        name: "test",
        description: "",
        image: "https://test",
        animationUrl: "test",
        youtubeUrl: "test",
        minter: constants.AddressZero,
      },
      1
    );

    expect(await boa.uri(0)).to.have.length.gt(1)
  });
});
