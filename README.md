Student Registry DApp

A simple full-stack decentralized application (DApp) for managing student records on the Ethereum blockchain. Built as a hands-on learning project to understand smart contracts, blockchain deployment, and connecting a React frontend to a Web3 wallet.

What It Does


A "teacher" (the wallet that deployed the contract) can add new student records on-chain
Anyone can view the list of registered students
Only the teacher's wallet can make changes — enforced directly in the smart contract
All actions are confirmed through MetaMask and recorded on the Ethereum Sepolia testnet


Tech Stack


Smart Contract: Solidity, Hardhat, Hardhat Ignition
Frontend: React (Vite), Ethers.js
Wallet: MetaMask
Network: Ethereum Sepolia (testnet)


Smart Contract

Deployed Address (Sepolia):



View on Etherscan:

https://sepolia.etherscan.io/address/0x7082154Ba8824B728e1D595e03d953f6cb984Cf6

Project Structure

student-Registry/
├── backend/      # Solidity contract + Hardhat deployment setup
└── frontend/     # React app that connects to the contract via MetaMask

Running It Locally

Backend (contract already deployed, but to redeploy):

bashcd backend
pnpm install
pnpm hardhat compile
pnpm hardhat ignition deploy ignition/modules/StudentRegistry.js --network sepolia

Frontend:

bashcd frontend
pnpm install
pnpm dev

Then open the app in your browser, connect MetaMask (set to Sepolia), and try adding a student.

Status

This is an active learning project. So far: contract is written, deployed, and connected to a working React frontend that can add and view students. Update and delete functionality, plus UI polish, are next.

License

MIT
