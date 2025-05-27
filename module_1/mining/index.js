const SHA256 = require('crypto-js/sha256')
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff)
const MAX_TRANSACTIONS = 10
const mempool = []
const blocks = []

function addTransaction(transaction) {
    mempool.push(transaction)
}

function mine() {
    const block = { id: blocks.length, transactions: [], nonce: 0}

    for (let i = mempool.length; i > 0; i--) {
        if(block.transactions.length < 5) {
            block.transactions.push(mempool.pop())
          
        }
       
    }
    let hash
    while(true) {
        hash = SHA256(JSON.stringify(block)).toString()

        if(BigInt(`0x${hash}`) <= TARGET_DIFFICULTY) {
            break
        }

        block.nonce++
    }
    blocks.push({ ...block, hash })
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction,
    mine,
    mempool,
    blocks,
}
