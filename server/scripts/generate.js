const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = toHex(secp.utils.randomPrivateKey());
const publicKeyIntermediate = toHex(secp.getPublicKey(privateKey));
const publicKey = publicKeyIntermediate.slice(-20);

console.log("Private key: " + privateKey);
console.log("Public key: " + publicKey);
