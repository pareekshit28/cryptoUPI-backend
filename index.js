const express = require("express");
const base64 = require("base-64");
const bodyParser = require("body-parser");
const axios = require("axios").default;
const cors = require("cors");

const app = express();
const PORT = process.env.port || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.options("*", cors());

app.post("/pay", (req, res) => {
  console.log(req.body);
  const username = "rzp_test_4QoYiedPNEZFo4";
  const pass = "IWkGMBiMFPaxRiVsg4Zhisti";
  const base = base64.encode(username + ":" + pass);

  axios
    .post(
      "https://api.razorpay.com/v1/payouts",
      {
        account_number: "2323230076368081",
        amount: req.body.amount * 100,
        currency: "INR",
        mode: "UPI",
        purpose: "payout",
        fund_account: {
          account_type: "vpa",
          vpa: {
            address: req.body.vpa,
          },
          contact: {
            name: req.body.vpa.substring(0, 10),
          },
        },
      },
      {
        headers: {
          Authorization: `Basic ${base}`,
        },
      }
    )
    .then((response) => {
      res.send({ id: response.data.id });
    })
    .catch((e) => {
      console.log("Error", e);
    });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
