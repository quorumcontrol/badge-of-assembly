import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { constants } from "ethers";
import { ethers } from "hardhat";
import {
  BadgeOfAssembly,
  BadgeOfAssembly__factory,
  MetadataPrinter__factory,
} from "../typechain";

describe("BadgeOfAssembly", function () {
  let deployer: SignerWithAddress;
  let boa: BadgeOfAssembly;

  before(async () => {
    const accts = await ethers.getSigners();
    deployer = accts[0];

    const MetadataPrinterFactory = new MetadataPrinter__factory(deployer);
    const metadataPrinter = await MetadataPrinterFactory.deploy();
    await metadataPrinter.deployed();
    const BadgeOfAssemblyFactory = new BadgeOfAssembly__factory(deployer);
    boa = await BadgeOfAssemblyFactory.deploy(metadataPrinter.address);
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
  });

  it("creates", async () => {
    const preface = "data:application/json;base64,";
    const rawMetadataUri: string = await boa.uri(1);
    const metadata = JSON.parse(
      Buffer.from(rawMetadataUri.replace(preface, ""), "base64").toString()
    );
    expect(metadata.name).to.equal("test");
  });

  it("can enumerate a users tokens", async () => {
    expect(await boa.userTokens(deployer.address)).to.have.lengthOf(1);
  });
});
