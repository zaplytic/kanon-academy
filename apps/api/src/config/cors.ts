import cors from "cors";
import { ENVIRONMENT } from "./secrets";

const prodAllowedOrigins = ["https://kanon-academy.pages.dev"];

const devAllowedOrigins = ["http://localhost:4200"];

const allowedOrigins = ENVIRONMENT === "production" ? prodAllowedOrigins : devAllowedOrigins;

export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) === -1) {
      return callback(null, false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  optionsSuccessStatus: 200
};
