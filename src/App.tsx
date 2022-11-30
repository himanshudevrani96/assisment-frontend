import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import { useEffect } from "react";
import "./App.css";
import { instance } from "./blockChain/instance";
import { injected, web3 } from "./config";
import contract from "./blockChain/contract.json";
function App() {
  const { activate, active, account, deactivate } = useWeb3React();

  const connector = async () => {
    try {
      await activate(injected);
      // await getBalance();
      // conversionToEth("1000000000000000000")
      // conversionTowei("1")
      trackStatus(
        "0x19a4d4031a9e0836556513696741dc8e5ab6328119675f5f83e330dd2bd1bcfb"
      );
    } catch (err) {
      console.error(err);
    }
  };

  const disconnect = () => {
    deactivate();
  };

  useEffect(() => {
    getBalance();
  }, []);
  useEffect(() => {
    if (account) {
      // callSendOperations();
      estimateGas();
      bigNumberOperation(2, 4);
      transfer('0x61cC301393b93CF208211173A355237012aDaD38',1)
    }
  }, [account]);

  //Qno 3
  const getBalance = async () => {
    try {
      console.log("...", web3);
      let bal = await instance.methods.balanceOf(
        "0x89C1710A79aC6c3Ceb4ff48e6E6d8af14869515C"
      );
      bal = new BigNumber(bal).dividedBy(10 ** 18);
      // console.log(bal.toFixed(0));
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
  const transfer = async ( receiver: string, amount: number) => {
    try {
      const amountWei = new BigNumber(amount).multipliedBy(10 ** 18);
      await instance.methods
        .transfer(receiver, amountWei)
        .send({
          from: account,
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
