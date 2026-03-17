import { instance } from "../../server.js";
import config from "../config/config.js";
import crypto from "crypto";

//! paymentProcess controller
export const paymentProcess = async (req, res) => {
  try {
    //! get the amount from the frontend
    const { amount } = req.body;
    //! create razorpay order options
    //* this object is send directly to razorpay server
    const options = {
      amount: amount * 100, //* convert rupees to paise bcs razorpay accepts money only in the smallest currency unit
      currency: "INR", //* tells the razorpay the currency type
      receipt: `receipt_${Date.now()}`, //* creates a unique reciept id for each transaction
    };
    //! create razorpay order
    //* it sends requests into razorpay server
    //* and it creates and order
    //* razorpay responds with order id, amount, currency and status
    const order = await instance.orders.create(options);
    //! send success message
    res.status(200).json({
      success: true,
      message: "Payment processed successfully",
      order, //* sends the order details to the frontend and frontend uses this order to open the razorpay checkout form
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Payment initialization failed",
    });
  }
};

//! getKey controller
export const getKey = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Key retrieved successfully",
      key: config.RAZOR_KEY_ID,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve key",
    });
  }
};

//! paymentVerification controller
export const paymentVerification = async (req, res) => {
  try {
  //! to run frontend and backend at a time
    const CLIENT_URL = process.env.CLIENT_URL;
    //* destruscture payment details from req.body
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;
    //* create the verification string
    // this exact format must match razorpays documentation
    // even one character mismatch will lead to verificatiin failed
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    //* generate expected signature using secret key
    const expectedSignature = crypto
      // we cannot replace 256
      // razorpay hmac with sha256 to generate the signature on their site
      .createHmac("sha256", process.env.RAZOR_KEY_SECRET)
      // converts the hash output into a hexadecimal string
      .update(body.toString())
      // this is what server expect the signature to be
      .digest("hex");
    // logs for debugging (this is optional, remove in the production)
    console.log("razorpay signature:", razorpay_signature);
    console.log("expected signature:", expectedSignature);
    //* compare signatures
    if (expectedSignature === razorpay_signature) {
      // payment is verified
      return res.redirect(
        `${CLIENT_URL}/payment-success?reference=${razorpay_payment_id}`,
      );
    } else {
      // when payment verification failed
      res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }
    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
    /* console.log(req.body); */
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in payment verification",
      error,
    });
  }
};
