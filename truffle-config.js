const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks : {
    development:{
      ganache : {
        host : "localhost",
        port : 8545, // By default Ganache runs on this port.
        network_id : "*" // network_id for ganache is 5777. However, by keeping * as value you can run this node on any network
        },
        host:"localhost",
        port : 8545,
        network_id : "*"
    }
    },
    compilers: {
      solc: {
        version: "^0.7.5", // A version or constraint - Ex. "^0.5.0"
                           // Can also be set to "native" to use a native solc
      },
    }
};
