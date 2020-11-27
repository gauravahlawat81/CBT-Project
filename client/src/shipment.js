import React, { Component } from "react";
import SimpleStorageContract from "./contracts/CoalSupplyChain.json";

import countries from "./countries";
import getWeb3 from "./getWeb3";


export default function Shipment() {
    // state = { storageValue: 0, web3: null, accounts: null, contract: null };
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);
  const [web3,setWeb3] = React.useState(null);
  const [accounts,setAccounts] = React.useState(null);
  const [contract,setContract] = React.useState(null);

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
      setWeb3(web3);
      setAccounts(accounts);
      setContract(instance);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    console.log(`
      Email: ${email}
      Password: ${password}
      Country: ${country}
      Accepted Terms: ${acceptedTerms}
    `);

    contract.methods.newShipment(email,password,country,"0xE927dAe31CFbFDBC3dFf6382ca6c0C83Aa845690").send({ from: accounts[0] });
    
    event.preventDefault();
  }



  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Shipment</h1>

      <label>
        Shipment ID:
        <input
          name="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required />
      </label>
      
      <label>
        Quality:
        <input
          name="quality"
          type="email"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required />
      </label>

      <label>
        Quantity:
        <input
        name="quantity"
        type="email"
        value={country}
        onChange={e => setCountry(e.target.value)}
        required/>
      </label>

      <label>
        <input
          name="acceptedTerms"
          type="checkbox"
          onChange={e => setAcceptedTerms(e.target.value)}
          required />
        I accept the terms of service        
      </label>

      <button>Submit</button>
    </form>
  );
}
