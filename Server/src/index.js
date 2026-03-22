import express from "express";
import cors from "cors";
import releaseRoutes from "./routes/releaseRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/releases", releaseRoutes);

app.get("/", (req, res) => {
  res.send("ReleasePilot API is running 🚀");
});

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});