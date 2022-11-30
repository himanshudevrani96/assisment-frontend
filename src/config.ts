import { InjectedConnector } from "@web3-react/injected-connector";
import Web3 from "web3";
const supportedChainId = 5;
export let PROVIDER_URL =
  "https://goerli.infura.io/v3/be7a0c3ba4154a8aaa4774f31a286e16";
export const PROVIDER_WS =
  "wss://goerli.infura.io/ws/v3/b1811bb546084bb183b94436be7e8ab4";
export const web3 = new Web3(Web3.givenProvider || PROVIDER_URL);
export const web3Ws = new Web3(Web3.givenProvider || PROVIDER_WS);
export const injected = new InjectedConnector({
  supportedChainIds: [supportedChainId],
});
