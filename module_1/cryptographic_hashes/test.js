const {assert, describe} = require('chai');
const findColor = require('./index');
const { sha256 } = require("ethereum-cryptography/sha256");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

const COLORS = ['red', 'green', 'blue', 'yellow', 'pink', 'orange', "a"];

COLORS.forEach((color) => {
    try {
        assert.equal(findColor(sha256(utf8ToBytes(color))), color);
    }catch (e) {
        console.log(`fail to color ${color}`)
    }
})