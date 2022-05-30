import { expect } from "chai";
import { ethers } from "hardhat";

describe("BadgeOfAssembly", function () {
  it("creates", async function () {
    const BadgeOfAssemblyFactory = await ethers.getContractFactory("BadgeOfAssembly");
    const boa = await BadgeOfAssemblyFactory.deploy();
    await boa.deployed();

    expect(await boa.uri(0)).to.equal("Hello, world!");
  });
});
