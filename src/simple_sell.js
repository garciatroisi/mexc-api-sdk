const Mexc = require("../dist/js/package/src");
require("dotenv").config();

const { MEXC_API_KEY, MEXC_API_SECRET } = process.env; 
const client = new Mexc.Spot()
client.config.apiKey = MEXC_API_KEY;
client.config.apiSecret = MEXC_API_SECRET;

// const singleRes = client.exchangeInfo({ symbol: "CATCHUSDT" })

// const allOrders = client.historicalTrades("CATCHUSDT");

// console.log(allOrders)

const newOrder = client.newOrder("CATCHUSDT", "SELL", "LIMIT", {
    timeInForce: "GTC",
    quantity: 5,
    price: 1.40,
    recvWindow: 10000
});

console.log(newOrder)
