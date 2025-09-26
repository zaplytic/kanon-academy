import cors from "cors";

const allowedOrigins = ["http://localhost:4200", "https://kanon-academy.pages.dev"];

export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("This origin is not allowed by CORS policy."));
    }
  },
  credentials: true
};
