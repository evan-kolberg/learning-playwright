const CRYPTO_KEY = "T7MSZsmiUrENC4Dk23koFA28";

// Source for encrypt/decrypt functions:
// https://gist.github.com/chrisveness/43bcda93af9f646d083fad678071b90a

const { TextEncoder } = require('util');
const crypto = require('crypto');

const aesGcmDecrypt = async (ciphertext) => {
  const pwUtf8 = new TextEncoder().encode(CRYPTO_KEY); // encode password as UTF-8
  const pwHash = await crypto.subtle.digest("SHA-256", pwUtf8); // hash the password

  const ivStr = atob(ciphertext).slice(0, 12); // decode base64 iv
  const iv = new Uint8Array(Array.from(ivStr).map((ch) => ch.charCodeAt(0))); // iv as Uint8Array

  const alg = { name: "AES-GCM", iv: iv }; // specify algorithm to use

  const key = await crypto.subtle.importKey("raw", pwHash, alg, false, [
    "decrypt",
  ]); // generate key from pw

  const ctStr = atob(ciphertext).slice(12); // decode base64 ciphertext
  const ctUint8 = new Uint8Array(
    Array.from(ctStr).map((ch) => ch.charCodeAt(0))
  ); // ciphertext as Uint8Array
  // note: why doesn't ctUint8 = new TextEncoder().encode(ctStr) work?

  try {
    const plainBuffer = await crypto.subtle.decrypt(alg, key, ctUint8); // decrypt ciphertext using key
    const plaintext = new TextDecoder().decode(plainBuffer); // plaintext from ArrayBuffer
    return plaintext; // return the plaintext
  } catch (e) {
    throw new Error("Decrypt failed");
  }
};

const encryptedText = process.argv[2];

aesGcmDecrypt(encryptedText)
  .then((decryptedText) => {
    console.log(decryptedText);
  })
