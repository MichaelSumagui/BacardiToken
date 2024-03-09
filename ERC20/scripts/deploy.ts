import { ethers } from "hardhat";

async function main() {
  const lock = await ethers.deployContract("Bacardi", ["0x366e68c7DA2fc06d4314ffb51027267B2532fA5A"]); //wallet add

  await lock.waitForDeployment();

  console.log(
    `Token deployed to ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});