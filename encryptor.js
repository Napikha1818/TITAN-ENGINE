// encryptor.js
const fs = require('fs');

// PASSWORD DARI GOOGLE SHEET (Pastikan sama persis!)
const SECRET_KEY_FROM_SHEET = "KudaEmasSakti123"; 

// DAFTAR SEMUA FILE KAMU
const FILES = [
    'stockfish.js', 
    'stockfish.wasm',
    'evil-morty-0.1a.bin',      // Otak 1 (Titan)
    'kb2300-20201231-1147.bin', // Otak 2 (Newbie/Amateur)
    'kb2300-20201231-2057.bin'  // Otak 3 (Club/Expert)
];

function xorBuffer(buffer, keyString) {
    const key = Buffer.from(keyString);
    const output = Buffer.alloc(buffer.length);
    for (let i = 0; i < buffer.length; i++) {
        output[i] = buffer[i] ^ key[i % key.length];
    }
    return output;
}

console.log("--- MENGUNCI 5 FILE DENGAN PASSWORD RAHASIA ---");

FILES.forEach(fname => {
    try {
        if (fs.existsSync(fname)) {
            const buf = fs.readFileSync(fname);
            const encrypted = xorBuffer(buf, SECRET_KEY_FROM_SHEET);
            fs.writeFileSync(fname + ".titan", encrypted); // Output .titan
            console.log(`[SUKSES] Terkunci: ${fname} -> ${fname}.titan`);
        } else {
            console.log(`[SKIP] File tidak ada: ${fname}`);
        }
    } catch(e) {
        console.error("Error:", e);
    }
});