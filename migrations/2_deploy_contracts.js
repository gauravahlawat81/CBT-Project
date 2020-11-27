var CoalSupplyChain = artifacts.require("./CoalSupplyChain.sol");

module.exports = function(deployer) {
  deployer.deploy(CoalSupplyChain);
};
