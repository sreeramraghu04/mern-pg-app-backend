import express from "express";
import morgan from "morgan";
import paymentRoutes from "./routes/paymentRoutes.js";
import cors from "cors";

const app = express();

//! middleware
app.use(
  cors({
    origin: `https://payment-gateway-app.sreeramraghu.online`, //* allows your frontend origin
    methods: [`GET`, `POST`],
    credentials: true, //* if using cookies or authentication headers
  }),
); //* always cors must be in top its allows to interact with client which is loaded in different domain
app.use(express.json()); //* instructing the app to accept data in the json format
app.use(morgan("dev")); //* logs requests, errors and more to the console
app.use(express.urlencoded({ extended: true })); //* to print req.body in frontend

//! routes
app.use("/api/v1/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("<h1>MERN Payment Gateway App</h1>");
});

export default app;
