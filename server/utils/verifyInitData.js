const crypto = require('crypto');


const VerifyUser = async (req, res) => {
    console.log("🔍 VerifyUser called");
    console.log("📥 Request body:", req.body);
    console.log("📥 Request headers:", req.headers);
    
    // NOTE: This assumes initData is sent in the request body as JSON: { initData: "..." }
    const { initData } = req.body;
    console.log("📥 Extracted initData:", initData);

    // Retrieve BOT_TOKEN from environment variables
    const BOT_TOKEN = process.env.BOT_TOKEN;
    console.log("🔑 BOT_TOKEN exists:", !!BOT_TOKEN);
    if (!BOT_TOKEN) {
        console.error("Security Alert: BOT_TOKEN is not defined in environment variables.");
        return res.status(500).json({ ok: false, error: "Internal server configuration error." });
    }

    if (!initData || typeof initData !== "string") {
        console.error("❌ Missing or invalid initData:", initData);
        return res.status(400).json({ ok: false, error: "Missing or invalid initData" });
    }

    try {
        console.log("🔍 Parsing initData with URLSearchParams");
        const urlParams = new URLSearchParams(initData);
        console.log("📋 All URL parameters:", Object.fromEntries(urlParams.entries()));
        
        const hash = urlParams.get("hash");
        console.log("🔐 Hash found:", !!hash);
        if (!hash) {
            console.error("❌ Missing hash parameter in initData");
            return res.status(400).json({ ok: false, error: "Missing hash parameter in initData" });
        }

        // --- Prepare the data-check-string ---
        
        // 1. The 'hash' parameter is never part of the data-check-string.
        urlParams.delete("hash");

        // 2. The data you provided contained a non-standard 'signature' field. 
        // We must ignore it, as Telegram does not include it in its hash calculation.
        if (urlParams.has("signature")) {
            urlParams.delete("signature"); // FIX: Remove non-standard signature field
        }

        const dataCheckArr = [];
        
        // Collect all remaining parameters in 'key=<value>' format.
        for (const [key, value] of urlParams.entries()) {
            dataCheckArr.push(`${key}=${value}`);
        }
        
        // 3. The parameters MUST be sorted alphabetically and joined with a newline character.
        const dataCheckString = dataCheckArr.sort().join("\n");

        // --- Step 1: Generate the HMAC secret key ---
        // CORRECTED FIX: The HMAC-key is "WebAppData", and the data is the BOT_TOKEN.
        // This generates the 32-byte (256-bit) secret key buffer.
        const secretKey = crypto
            .createHmac("sha256", "WebAppData") // Key: literal string "WebAppData"
            .update(BOT_TOKEN)                  // Data: Your Telegram Bot Token
            .digest();                          // Output: Buffer (the secret key)

        // --- Step 2: Calculate the hash of the data-check-string ---
        const calculatedHash = crypto
            .createHmac("sha256", secretKey)   // Key: The secret key Buffer from Step 1
            .update(dataCheckString)           // Data: The sorted data-check-string
            .digest('hex');                     // Output: Hexadecimal string for direct comparison

        // --- Step 3: Compare hashes ---
        console.log("🔍 Comparing hashes:");
        console.log("📥 Incoming hash:", hash);
        console.log("🧮 Calculated hash:", calculatedHash);
        console.log("✅ Hashes match:", calculatedHash === hash);
        
        if (calculatedHash === hash) {
            console.log("✅ User data verified successfully!");
            const userStr = urlParams.get("user");
            console.log("👤 User string found:", !!userStr);
            console.log("👤 User string content:", userStr);
            
            if (userStr) {
                 try {
                     // Parse the user JSON string to return as an object
                     const userData = JSON.parse(userStr);
                     console.log("✅ Parsed user data:", userData);
                     console.log("📤 Sending response with user data");
                     return res.json({ ok: true, user: userData, message: "Validation success." });
                 } catch (e) {
                     console.error("❌ Error parsing user JSON:", e);
                     return res.status(400).json({ ok: false, error: "Invalid user JSON format." });
                 }
            }
            console.log("📤 Sending response without user data");
            return res.json({ ok: true, message: "Validation successful." });
        } else {
            console.warn(`❌ Hash validation failed! Incoming Hash: ${hash}, Calculated Hash: ${calculatedHash}`);
            return res.status(403).json({ ok: false, error: "Invalid hash: Message authentication failure." });
        }

    } catch (error) {
        console.error("An unexpected error occurred during validation:", error);
        return res.status(500).json({ ok: false, error: "Internal server error" });
    }
};

module.exports = { VerifyUser };
