import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function ({
  deployments,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("BadgeOfAssembly", {
    from: deployer,
    gasLimit: 4000000,
    log: true,
    deterministicDeployment: true,
    args: [],
  });
};
export default func;
