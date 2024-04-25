const Mexc = require("../dist/js/package");
require("dotenv").config();

const { MEXC_API_KEY, MEXC_API_SECRET } = process.env; 
const client = new Mexc.Spot()
client.config.apiKey = MEXC_API_KEY;
client.config.apiSecret = MEXC_API_SECRET;

// const singleRes = client.exchangeInfo({ symbol: "CATCHUSDT" })

// const allOrders = client.historicalTrades("CATCHUSDT");

// console.log(allOrders)

const canceledOrder = client.cancelOrder("CATCHUSDT", {
    orderId: 'C02__410662342460710912015'
});

console.log(canceledOrder)
