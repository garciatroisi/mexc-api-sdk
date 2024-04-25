const readline = require("readline");
const Mexc = require("../dist/js/package");
require("dotenv").config();

const { MEXC_API_KEY, MEXC_API_SECRET } = process.env;
const client = new Mexc.Spot();
client.config.apiKey = MEXC_API_KEY;
client.config.apiSecret = MEXC_API_SECRET;

const usdtToSpend = 24;
let quantityBought = 0;

// Function to execute a buy order in the market
function buy(symbol) {
  // Logic to execute a buy order at market price
  console.log("Buying", symbol, "at market price...");
  // Code to execute the buy order in the market using the corresponding API
  const newBuy = client.newOrder(symbol, "BUY", "MARKET", {
    quoteOrderQty: usdtToSpend,
    recvWindow: 10000,
  });
  quantityBought = newBuy.origQty;
  console.log(newBuy);
  console.log(quantityBought);
}

// Function to execute a sell order in the market
function sell(symbol) {
  // Logic to execute a sell order at market price
  console.log(`Selling ${quantityBought / 3} of ${symbol} at market price...`);
  // Code to execute the sell order in the market using the corresponding API
  const newSell = client.newOrder(symbol, "SELL", "MARKET", {
    quantity: quantityBought / 3,
    recvWindow: 10000,
  });

  console.log(newSell);
}

// Create a readline interface for reading from the console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Ask the user for the symbol
rl.question("Please enter the symbol: ", (symbol) => {
  // Convert symbol to uppercase and append "USDT"
  symbol = symbol.toUpperCase() + "USDT";
  try {
    // Execute a buy order
    buy(symbol);
    // Wait for 30 seconds before executing the sell order
    setTimeout(() => {
      sell(symbol);
      logMessage("selling 20s");
    }, 10000);

    // Vender en 40 segundos
    setTimeout(() => {
      sell(symbol);
      logMessage("selling 30s");
    }, 30000);

    // Vender en 60 segundos
    setTimeout(() => {
      sell(symbol);
      logMessage("selling 60s");
    }, 60000);
  } catch {
    const newSell = client.newOrder(symbol, "SELL", "MARKET", {
      quantity: quantityBought,
      recvWindow: 10000,
    });
  
    console.log(`CATCH Selling ${quantityBought} of ${symbol} at market price...`);
    console.log(newSell);
  }
  rl.close();
});

function logMessage(message) {
  const now = new Date();
  const formattedTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  console.log(`[${formattedTime}] ${message}`);
}
