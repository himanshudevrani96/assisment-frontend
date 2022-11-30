import { useWeb3React } from "@web3-react/core";
import "./App.css";
import { injected } from "./config";

function App() {
  const { activate, active, account, deactivate } = useWeb3React();

  const connector = async () => {
    try {
      await activate(injected);
    } catch (err) {
      console.error(err);
    }
  };

  const disconnect = () => {
    deactivate();
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
      {active ? <div>Account : {account}</div> : ''}
    </div>
  );
}

export default App;
