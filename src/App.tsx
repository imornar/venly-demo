import {
  Connector,
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
} from "wagmi";
import "./App.css";

function App() {
  const { connectors, connectAsync } = useConnect();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();

  async function handleConnect({ connector }: { connector: Connector }) {
    const result = await connectAsync({ connector });
    console.log("result", result);
  }

  return (
    <>
      <h1>Venly + Wagmi</h1>
      <b>Connect using:</b>
      <br />
      {connectors.map((connector) => (
        <button onClick={() => handleConnect({ connector })}>
          {connector.name}
        </button>
      ))}
      <br />
      <b>Account</b>
      <pre>{JSON.stringify({ address, isConnected }, null, 2)}</pre>
      <b>Chain</b>
      <br />
      <br />
      {chain && (
        <pre>
          {JSON.stringify(
            { id: chain.id, unsupported: chain.unsupported },
            null,
            2
          )}
        </pre>
      )}
      <button
        onClick={() => disconnect()}
        style={{ background: "red", color: "white" }}
      >
        DISCONNECT
      </button>
    </>
  );
}

export default App;
