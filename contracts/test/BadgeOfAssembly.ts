import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { constants } from "ethers";
import { ethers } from "hardhat";
import {
  BadgeOfAssembly,
  BadgeOfAssembly__factory,
  MetadataPrinter__factory,
} from "../typechain";

const preface = "data:application/json;base64,";

function rawMetaToObject(rawMetadataUri: string) {
  return JSON.parse(
    Buffer.from(rawMetadataUri.replace(preface, ""), "base64").toString()
  );
}

describe("BadgeOfAssembly", function () {
  let deployer: SignerWithAddress;
  let boa: BadgeOfAssembly;

  const metadata = {
    name: "test",
    description: "",
    image: "https://test",
    animationUrl: "test",
    youtubeUrl: "test",
    minter: constants.AddressZero,
  };

  before(async () => {
    const accts = await ethers.getSigners();
    deployer = accts[0];

    const MetadataPrinterFactory = new MetadataPrinter__factory(deployer);
    const metadataPrinter = await MetadataPrinterFactory.deploy();
    await metadataPrinter.deployed();
    const BadgeOfAssemblyFactory = new BadgeOfAssembly__factory(deployer);
    boa = await BadgeOfAssemblyFactory.deploy(metadataPrinter.address);
    await boa.deployed();
    await boa.setup(metadata, 1);
  });

  it("creates", async () => {
    const rawMetadataUri: string = await boa.uri(1);
    const metadata = rawMetaToObject(rawMetadataUri);
    expect(metadata.name).to.equal("test");
  });

  it("enumerates a users tokens", async () => {
    expect(await boa.userTokens(deployer.address)).to.have.lengthOf(1);
  });

  it("updates metadata", async () => {
    await boa.updateMetadata(1, {
      ...metadata,
      minter: deployer.address,
      name: "new name",
    });
    const newMeta = rawMetaToObject(await boa.uri(1));
    expect(newMeta.name).to.equal("new name");
  });
});
