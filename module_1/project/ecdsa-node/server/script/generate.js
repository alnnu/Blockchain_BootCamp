const { secp256k1 }  = require("ethereum-cryptography/secp256k1")
const { toHex } = require("ethereum-cryptography/utils")


const privateKey = secp256k1.utils.randomPrivateKey()

console.log('private key: ', toHex(privateKey))

const public = secp256k1.getPublicKey(privateKey)

console.log('public key: ', toHex(public))