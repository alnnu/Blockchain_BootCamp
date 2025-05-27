const { assert } = require('chai');
const { mine, blocks, mempool, addTransaction, TARGET_DIFFICULTY } = require('./index');
const SHA256 = require('crypto-js/sha256');


for (let i = 0; i < 5; i++) {
    addTransaction({ sender: 'bob', to: 'alice' });
}

mine();

assert.equal(blocks.length, 1)
assert.equal(blocks[blocks.length - 1].transactions.length, 5);
assert.equal(mempool.length, 0);
assert.isDefined(blocks[blocks.length - 1].nonce, "did not find a nonce on the block");

const actual1 = blocks[blocks.length - 1].hash.toString();
const isLess1 = BigInt(`0x${actual1}`) < TARGET_DIFFICULTY;

assert(isLess1, "expected the hash to be less than the target difficulty");
for (let i = 0; i < 15; i++) {
    addTransaction({ sender: 'bob', to: 'alice' });
}
mine();
assert.equal(blocks.length, 2);
assert.equal(blocks[blocks.length - 1].transactions.length, 10);
assert.equal(mempool.length, 5);
assert.isDefined(blocks[blocks.length - 1].nonce, "did not find a nonce on the block");
const actual2 = blocks[blocks.length - 1].hash.toString();
const isLess2 = BigInt(`0x${actual2}`) < TARGET_DIFFICULTY;
assert(isLess2, "expected the hash to be less than the target difficulty");
mine();
assert.equal(blocks.length, 3);
assert.equal(blocks[blocks.length - 1].transactions.length, 5);
assert.equal(mempool.length, 0);
assert.isDefined(blocks[blocks.length - 1].nonce, "did not find a nonce on the block");
const actual3 = blocks[blocks.length - 1].hash.toString();
const isLess3 = BigInt(`0x${actual3}`) < TARGET_DIFFICULTY;
assert(isLess3, "expected the hash to be less than the target difficulty");
