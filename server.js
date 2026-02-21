import app from "./src/App.js";
import config from "./src/config/config.js";
import Razorpay from "razorpay";

export const instance = new Razorpay({
  key_id: config.RAZOR_KEY_ID,
  key_secret: config.RAZOR_KEY_SECRET,
});

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
