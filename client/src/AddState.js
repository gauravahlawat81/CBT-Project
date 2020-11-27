import React, { Component } from "react";
import SimpleStorageContract from "./contracts/CoalSupplyChain.json";
import getWeb3 from "./getWeb3";

import "./App.css";
// import Shipment from "./shipment";

class AddSate extends Component {
  
  state = { storageValue: 0, web3: null, accounts: null, contract: null,id:12,quality:0,quantity:0 };


  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

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
      const response = await this.getResponse();
      console.log(response);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = (event) => {
    const { accounts, contract } = this.state;
    console.log("Accounts " +accounts);
    console.log("Contract " + contract);
    console.log(contract.methods);
    // Stores a given value, 5 by default.

    // // Get the value from the contract to prove it worked.

    this.getResponse().then(response =>{
        console.log(response);
        // event.preventDefault();
    });
    // console.log(response);
    event.preventDefault();

    // // Update state with the result.
    // this.setState({ storageValue: response });
  };

  getResponse = async () =>{
    const { accounts, contract } = this.state;
    const response = await contract.methods.viewShipment(this.state.id).call();
    return response;

  }
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div>
      {/* <Shipment></Shipment> */}
        <div>

          <form onSubmit={this.runExample}>
          <h1>View Shipment History</h1>

            <label >
            Enter the Shipment ID:
              <input  value={this.state.id} onChange={ e => this.setState({id:e.target.value})}></input>
            </label>
            {/* <label >
              Enter the quality:
              <input  value={this.state.quality} onChange={ e => this.setState({quality:e.target.value})}></input>
            </label>
            <label >
              Enter the quantity:
              <input  value={this.state.quantity} onChange={ e => this.setState({quantity:e.target.value})}></input>
            </label> */}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      
    );
  }
}

export default AddSate;
