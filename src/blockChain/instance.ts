import { web3 } from "../config";
import contract  from "./contract.json"

export const instance: any = new web3.eth.Contract(contract.abi, contract.add)