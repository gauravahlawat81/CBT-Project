import React, { Component } from "react";
import SimpleStorageContract from "./contracts/CoalSupplyChain.json";
import getWeb3 from "./getWeb3";

import "./App.css";
// import Shipment from "./shipment";

class App extends Component {
  
  state = { storageValue: 0, web3: null, accounts: null, contract: null,id:0,quality:0,quantity:0 ,checked:false};


  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      console.log(web3);
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
      console.log(this.state.accounts);
      const val = await web3.eth.getAccounts();
      // console.log("Accounts  "+val);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async (event) => {
    const { accounts, contract } = this.state;
    console.log("Accounts " +accounts);
    console.log("Contract " + contract);
    console.log(contract.methods);
    // Stores a given value, 5 by default.
    

    if(this.state.checked){
      await contract.methods.addState(this.state.id,this.state.quality,
        this.state.quantity,"0x3883111a347E1DcE5E05Cd2157D8a343550D76Da").send({ from: accounts[0] });
    }

    else{
      await contract.methods.newShipment(this.state.id,this.state.quality,
        this.state.quantity,"0x3883111a347E1DcE5E05Cd2157D8a343550D76Da").send({ from: accounts[0] });
  

    }
    // // Get the value from the contract to prove it worked.
    // const response = await contract.methods.viewShipment(1).call();
    // console.log(accounts);
    event.preventDefault();

    // // Update state with the result.
    // this.setState({ storageValue: response });
  };
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div>
      {/* <Shipment></Shipment> */}
        <div>

          <form onSubmit={this.runExample}>
          <h1>Enter a new Shipment</h1>

            <label >
            Enter the Shipment ID:
              <input  value={this.state.id} onChange={ e => this.setState({id:e.target.value})}></input>
            </label>
            <label >
              Enter the quality:
              <input  value={this.state.quality} onChange={ e => this.setState({quality:e.target.value})}></input>
            </label>
            <label >
              Enter the quantity:
              <input  value={this.state.quantity} onChange={ e => this.setState({quantity:e.target.value})}></input>
            </label>
            <label>
              <input
              name="newShipment"
              type="checkbox"
              onChange={e => this.setState({checked:e.target.value})}
              />
              Check this box if you want to add details into existing one
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      
    );
  }
}

export default App;
