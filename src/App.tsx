import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import { useEffect } from "react";
import "./App.css";
import { instance, instancePublic } from "./blockChain/instance";
import { injected, web3, web3Public } from "./config";
import contract from "./blockChain/contract.json";
function App() {
  const { activate, active, account, deactivate, library } = useWeb3React();

  const connector = async () => {
    try {
      await activate(injected);
      // await getBalance();
      // conversionToEth("1000000000000000000")
      // conversionTowei("1")
      // trackStatus(
      //   "0x3195734dc2145b9107f8039e8c93a0be1fcdd6db4877c2a600ef0af6bc703081"
      // );
    } catch (err) {
      console.error(err);
    }
  };

  const disconnect = () => {
    deactivate();
  };

  useEffect(() => {
    if (instance) {
      withoutConnectmethod();
    }
  }, []);

  useEffect(() => {
    if (account) {
      // callSendOperations();
      estimateGas();
      bigNumberOperation(2, 4);
      // transfer('0x61cC301393b93CF208211173A355237012aDaD38',1)
      // signTx();
    }
  }, [account]);

  //Qno 3
  const withoutConnectmethod = async () => {
    try {
      let name = await instancePublic.methods.name().call();
      console.log(name);
    } catch (err) {
      console.error(err);
    }
  };

  //Qno 5
  const signTx = async () => {
    if (!account) return;
    try {
      let message = "message to be sent as it is";
      const messageToSha3: any = web3.utils.sha3(message);
      console.log("web3.eth", web3.eth);

      // const res = await web3.eth.sign(messageToSha3, account);
      // const res = await library.eth.personal.sign(message, account);
      const res = await web3.eth.personal.sign(messageToSha3, account, "");
      console.log({ res });
    } catch (err) {
      console.error(err);
    }
  };
  //Qno 4
  const callSendOperations = async () => {
    try {
      let allowance = await instance.methods
        .allowance(account, contract.add)
        .call();
      allowance = new BigNumber(allowance).dividedBy(10 ** 18);
      console.log(allowance.toString());
      await instance.methods
        .approve(contract.add, "1000000000000000")
        .send({ from: account })
        .on("transactionHash", (hash: any) => {
          alert(hash);
        })
        .on("receipt", (receipt: any) => {
          alert("liquidity removed successfully");
        })
        .on("error", (error: any, receipt: any) => {
          alert("transaction failed");
        });
    } catch (err) {
      console.error(err);
    }
  };

  //Qno 6
  const conversionTowei = (amount: string) => {
    let toWei = new BigNumber(amount).multipliedBy(10 ** 18);
    console.log(toWei.toString());
  };
  //Qno 6
  const conversionToEth = (amount: string) => {
    let toEth = new BigNumber(amount).dividedBy(10 ** 18);
    console.log(toEth.toString());
  };

  //Qno 7
  const trackStatus = async (hash: string) => {
    try {
      web3.eth.getTransactionReceipt(hash).then(function (events: any) {
        console.log(events);
        console.log(events.status);
      });
    } catch (err) {
      console.error(err);
    }
  };

  //Qno 8
  const transfer = async (receiver: string, amount: number) => {
    try {
      const amountWei = new BigNumber(amount).multipliedBy(10 ** 18);
      await instance.methods
        .transfer(receiver, amountWei)
        .send({
          from: account,
          gasLimit: 900000,
        })
        .on("transactionHash", (hash: any) => {
          alert(hash);
        })
        .on("receipt", (receipt: any) => {
          alert("liquidity removed successfully");
        })
        .on("error", (error: any, receipt: any) => {
          alert("transaction failed");
        });
    } catch (err) {
      console.error(err);
    }
  };

  //Qno 9
  const bigNumberOperation = (a: number, b: number) => {
    const left = new BigNumber(a).plus(b).pow(2);
    const right = new BigNumber(b).pow(2).plus(a - b);
    const res = left.dividedBy(right);
    console.log(res.toString());
  };

  //Qno 10
  const estimateGas = async () => {
    try {
      console.log(instance);

      const estGas = await instance.methods
        .approve(contract.add, "1000000000000000")
        .estimateGas({ from: account });
      console.log({ estGas });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="navbar">
      {!active ? (
        <button className="connect-button" onClick={() => connector()}>
          Connect
        </button>
      ) : (
        <button className="connect-button" onClick={() => disconnect()}>
          Disconnect
        </button>
      )}
      {active ? <div>Account : {account}</div> : ""}
    </div>
  );
}

export default App;
