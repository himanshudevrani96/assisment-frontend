import { web3, web3Public } from "../config";
import contract  from "./contract.json"

export const instance: any = new web3.eth.Contract(contract.abi, contract.add)
export const instancePublic: any = new web3Public.eth.Contract(contract.abi, contract.add)