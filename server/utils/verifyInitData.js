

const VerifyUser=async(req,res)=>{
    const { initData } = req.body;
    if (!initData || typeof initData !== "string") {
      return res.status(400).json({ ok: false, error: "Missing initData" });
    }
  
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get("hash");
    if (!hash) return res.status(400).json({ ok: false, error: "Missing hash" });
  
    urlParams.delete("hash");
  
    const dataCheckString = [...urlParams.entries()]
      .map(([k, v]) => `${k}=${v}`)
      .sort()
      .join("\n");
  
    // === CORRECT: secretKey = HMAC_SHA256(key = BOT_TOKEN, data = "WebAppData") ===
    const secretKey = crypto
      .createHmac("sha256", BOT_TOKEN)   // BOT_TOKEN is HMAC key
      .update("WebAppData")              // message is the literal string
      .digest();                         // Buffer (binary key)
  
    const calculatedHash = crypto
      .createHmac("sha256", secretKey)
      .update(dataCheckString)
      .digest();                         // Buffer for timingSafeEqual
  
    // Use constant-time compare
    const incomingHashBuffer = Buffer.from(hash, "hex");
    if (
      incomingHashBuffer.length === calculatedHash.length &&
      crypto.timingSafeEqual(incomingHashBuffer, calculatedHash)
    ) {
      /*Extra check: auth_date freshness
      const authDate = Number(urlParams.get("auth_date") || 0);
      if (!authDate || Math.abs(Math.floor(Date.now() / 1000) - authDate) > MAX_AGE_SECONDS) {
        return res.status(403).json({ ok: false, error: "Stale auth_date" });
      }*/
  
      const userStr = urlParams.get("user");
      let user = null;
      try {
        user = JSON.parse(userStr);
        console.log(user,"user");
        
        return res.json({ ok: true, user });
      } catch (e) {
        return res.status(400).json({ ok: false, error: "Invalid user JSON" });
      }
  
     
    }
  
     
}


 

/*
query_id=AAH3nF0AAAAA3nF0ABCD1234
&user=%7B%22id%22%3A123456789%2C%22first_name%22%3A%22John%22%2C%22last_name%22%3A%22Doe%22%2C%22username%22%3A%22johndoe%22%2C%22language_code%22%3A%22en%22%7D
&auth_date=1729164523
&hash=5d3a8aefaf7cb98c8853b6de8e9a457e89f9a1cd14535e4ac6f6ef123456abcd
*/







module.exports={VerifyUser}