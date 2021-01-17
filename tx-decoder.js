var Web3 = require('web3');
var abiDecoder = require('abi-decoder');
let fs = require("fs");
// IT NEEDS LOG TO EMITTED
// Create a web3 connection to a running geth node over JSON-RPC running at
// http://localhost:8545
// For geth VPS server + SSH tunneling see
// https://gist.github.com/miohtama/ce612b35415e74268ff243af645048f4
let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:7545'));

// Read the compiled contract code
// Compile with
// solc SampleContract.sol --combined-json abi,asm,ast,bin,bin-runtime,clone-bin,devdoc,interface,opcodes,srcmap,srcmap-runtime,userdoc > contracts.json
let source = fs.readFileSync("chocolavabank.json");
let contracts = JSON.parse(source);



abiDecoder.addABI(contracts.abi);
const testData = "0000000000000000000000000000000000000000000000000000000000001388";
const decodedData = abiDecoder.decodeMethod(testData);
console.log(decodedData)
//console.log(decodedData.events)

web3.eth.getTransactionReceipt("0x093f542afdd6ba4ee9ac06a82f542cea4168cd27236d382adb543b5936c87424", function(e, receipt) {
    console.log(e)
    console.log(receipt)
    const decodedLogs = abiDecoder.decodeLogs(receipt.logs);
    console.log(decodedLogs)
    console.log(decodedLogs[0].events)
  });

  
