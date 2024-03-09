import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0x912789766664F97968B0C74387d2318931ADdE38", //contract add
        abi as any,
        signer
    );
}