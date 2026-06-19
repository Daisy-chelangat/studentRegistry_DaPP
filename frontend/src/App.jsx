import { useState } from "react";
import { getContract } from "./contract";
import "./App.css";

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [students, setStudents] = useState([]);
  const[name , setName] = useState("");
  const [age , setAge] = useState("");
  const [course , setCourse] = useState("");

  
  async function connectWallet() {
    const c = await getContract();
    if (!c) return;

    setContract(c);

    const signerAddress = await c.runner.getAddress();
    setAccount(signerAddress);
  }

  async function loadStudents() {
    if (!contract) return;

    const result = await contract.getAllStudents();
    setStudents(result);
  }

  return (
    <div>
      <h1>Student Registry</h1>

      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>Connected: {account}</p>
      )}

      <button onClick={loadStudents}>Load Students</button>

      <ul>
        {students.map((s) => (
          <li key={s.id.toString()}>
            ID: {s.id.toString()} - {s.name} - Age: {s.age.toString()} - {s.course}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;