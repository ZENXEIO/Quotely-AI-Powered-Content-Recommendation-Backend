import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const Cors = cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
});

app.use(Cors);

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ limit: "20kb", extended: "true" }));
app.use(express.static("public"));
app.use(cookieParser());

export default app;
