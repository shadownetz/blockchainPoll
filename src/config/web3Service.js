import Web3 from "web3";
const contractABI = require("./contractABI.json");

class Web3Service{
    web3;
    contract;
    contractAddress = "0x20f42834204f896f20f191446Ab461798aB4e6C3";
    accounts = []

    constructor() {
        if(window.ethereum !== 'undefined'){
            this.web3 = new Web3(window.ethereum);
            this.contract = new this.web3.eth.Contract(
                contractABI,
                this.contractAddress
            );
        }else{
            alert("Metamask not found. Install or enable Metamask")
        }
    }

    stringToByte32(value){
        return Web3.utils.fromAscii(value)
    }
    stringFromBytes32(value){
        return Web3.utils.toAscii(value)
    }

    async getAccounts(){
        this.accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
    get account(){
        return this.accounts[0]
    }

    async execTransaction(name, ...params){
        return this.contract.methods[name](...params).send({
            from: this.account // user wallet address
        })
    }

    async call(name, ...params){
        return this.contract.methods[name](...params).call({
            from: this.account // user wallet address
        })
    }

}

export default Web3Service