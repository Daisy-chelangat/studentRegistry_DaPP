import  { ethers } from 'ethers';
import studentRegistryArtifact from "./contracts/StudentRegistry.json";
import {CONTRACT_ADDRESS} from "./contractConfig";


export async function getContract(){
    if(!window.ethereum){
        alert("metamask not installed!!");
        return null;
    }


    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    const contract =new ethers.Contract(CONTRACT_ADDRESS, studentRegistryArtifact.abi, signer);

    return contract;
}
