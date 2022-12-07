import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

function Wallet({
    address,
    setAddress,
    balance,
    setBalance,
    privateKey,
    setPrivateKey,
}) {
    async function onChange(evt) {
        const privateKey = evt.target.value;
        setPrivateKey(privateKey);
        setAddress(toHex(secp.getPublicKey(privateKey)).slice(-20));
        if (address) {
            const {
                data: { balance },
            } = await server.get(`balance/${address}`);
            setBalance(balance);
        } else {
            setBalance(0);
        }
    }

    return (
        <div className="container wallet">
            <h1>Your Wallet</h1>

            <label>
                Private Key
                <input
                    placeholder="Type a private key, for example: 0x1"
                    value={privateKey}
                    onChange={onChange}
                ></input>
            </label>

            <div className="balance">Balance: {balance}</div>
            <div>Address: &nbsp;{address || "No address"}</div>
        </div>
    );
}

export default Wallet;
