const { PublicKey, Account } = require("@project-serum/anchor").web3;

const DEX_PID = new PublicKey("SRMrEgnzRgGMQ8QzcL8cjWr5xpdVs1KQCQ58Jkkq1qx");

// This msut be kept in sync with `scripts/localnet.sh`.
const PROGRAM_KP = new Account([
  168,
  86,
  206,
  125,
  127,
  105,
  201,
  250,
  37,
  102,
  161,
  124,
  80,
  181,
  60,
  2,
  166,
  123,
  176,
  161,
  228,
  188,
  134,
  186,
  158,
  68,
  197,
  240,
  202,
  193,
  174,
  234,
  167,
  123,
  252,
  186,
  72,
  51,
  203,
  70,
  153,
  234,
  190,
  2,
  134,
  184,
  197,
  156,
  113,
  8,
  65,
  1,
  83,
  220,
  152,
  62,
  200,
  174,
  40,
  180,
  218,
  61,
  224,
  6,
]);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  sleep,
  DEX_PID,
  PROGRAM_KP,
};
