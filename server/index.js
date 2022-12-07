const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
    "1a7a6718e86f22adab8c": 100,
    "19a72810ca17a78f7c08": 50,
    "5b8e670eb3605a4a8385": 75,
};

app.get("/balance/:address", (req, res) => {
    const { address } = req.params;
    const balance = balances[address] || 0;
    res.send({ balance });
});

app.post("/send", (req, res) => {
    const { sender, recipient, amount } = req.body;

    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
        res.status(400).send({ message: "Not enough funds!" });
    } else {
        balances[sender] -= amount;
        balances[recipient] += amount;
        res.send({ balance: balances[sender] });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
    if (!balances[address]) {
        balances[address] = 0;
    }
}

// Private key: bd640ba4d98fa541e3a7a199de9e9e989b43fd4398048519be09a9bc51fc41c9
// Public key: 1a7a6718e86f22adab8c

// Private key: 1f7548942d69849e513b770f11d51eaa90f85c092c5ecc838bfc702eb5a2f596
// Public key: 19a72810ca17a78f7c08

// Private key: fa10df54dafbebb1c08d11e7efdda98202b7c3c5c8c83e5539eb2ce463a7fd51
// Public key: 5b8e670eb3605a4a8385
