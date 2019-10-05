const CryptoJS = require("crypto-js"),
    hexToBinary = require("hex-to-binary");

class Block {
    constructor(index, hash, previousHash, timestamp, data, difficulty, nonce) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.difficulty = difficulty;
        this.nonce = nonce;
    }
}

const getTimestamp = () => Math.round(new Date().getTime() / 1000);

const createHash = (index, previousHash, timestamp, data, difficulty, nonce) =>
    CryptoJS.SHA256(
        index + previousHash + timestamp + JSON.stringify(data) + difficulty + nonce
    ).toString();

const genesisBlock = new Block(
    0, //index
    "4d1bff8db689882e2bb4c5236d054d3513ad4f4500caebfb7b14b4531981aa45", //hash
    "", //previous hash
    1569523151, //timestamp
    "", //genesisTx
    4, //difficulty
    0 //nonce
);

//블록체인 선언 blockchain
let blockchain = [genesisBlock];

//가장 최신 블록
const getNewestBlock = () => blockchain[blockchain.length - 1];

//블록체인 전체
const getBlockchain = () => blockchain;

const isBlockValid = (candidateBlock, latestBlock) => {
    //TODO :
    // 블록 내부 구조 확인 (index는 숫자, hash는 문자열 등등)
    // 추가하려는 블록 index 가 이전 index +1 이 맞는지 확인
    // previousHash 값이 실제 이전 블록의 해시 값과 맞는지 확인
    // 현재 블록의 Hash 값이 맞는지 확인
    //timestamp가 현재 시각/이전 블록과 1분 이내 차이 인지 확인
    return true;
}

const addBlockToChain = candidateBlock => {
    if (isBlockValid(candidateBlock, getNewestBlock())) {
        //TODO: Tx 관련 작업
        blockchain.push(candidateBlock); //push를 하면 배열 맨 마지막에 추가
        return true;
    } else {
        return false;
    }
}

const calculateNewDifficulty = (newestBlock, blockchain) => {
    return 0;
};

const findDifficulty = () => {
    return genesisBlock.difficulty;
};

// const hashMatchesDifficulty = (hash, difficulty = 0) => {
//     return true;
// }

const hashMatchesDifficulty = (hash, difficulty = 0) => {
    const hashInBinary = hexToBinary(hash);
    const requiredZeros = "0".repeat(difficulty);
    console.log("Trying difficulty: ", difficulty, "with hash", hashInBinary);
    return hashInBinary.startsWith(requiredZeros);
}

const findBlock = (index, previousHash, timestamp, data, difficulty) => {
    let nonce = 0;
    while (true) {
        console.log("hash : ")
        const hash = createHash(
            index,
            previousHash,
            timestamp,
            data,
            difficulty,
            nonce
        );
        if (hashMatchesDifficulty(hash, difficulty)) {
            return new Block(
                index,
                hash,
                previousHash,
                timestamp,
                data,
                difficulty,
                nonce
            );
        }
        nonce++;
    }
};

findBlock(1, "4d1bff8db689882e2bb4c5236d054d3513ad4f4500caebfb7b14b4531981aa45", getTimestamp(), "", 4)