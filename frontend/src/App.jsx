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
    const ownerAddress = await c.owner();
    console.log("Contract owner is:", ownerAddress);

    const signerAddress = await c.runner.getAddress();
    setAccount(signerAddress);
  }

  async function loadStudents() {
    if (!contract) return;

    const result = await contract.getAllStudents();
    setStudents(result);
  }

  async function addStudent(){
    if(!contract) return;
    const tx = await contract.addStudent(name ,Number(age), course);
    await tx.wait();

    setName("");
    setAge("");
    setCourse("");

    loadStudents();
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

      <div>
        <h3>Add Student</h3>

        <input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="age" value={age} onChange={(e) => setAge(e.target.value)} />
        <input placeholder="course" value={course} onChange={(e) => setCourse(e.target.value)} />

        <button onClick={addStudent}>Add Student</button>

      </div>

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