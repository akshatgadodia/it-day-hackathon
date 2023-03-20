import { CONTRACT_ADDRESS, ABI } from "./constants";
import { ethers } from 'ethers';

let contract;

const connectEther = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    return contract;
}

export default connectEther;
export { contract };