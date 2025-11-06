import express from "express";
import sequelize from "./config/database.js";
import userRoutes from "./routes/UserRoutes.js";
import postRoutes from "./routes/PostRoutes.js";

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Test DB connection
sequelize
  .authenticate()
  .then(async () => {
    console.log("✅ Database connected successfully!");
    await sequelize.sync({ alter: true });
    console.log("✅ Tables synced!");
  })
  .catch((err) => console.error("❌ DB connection error:", err));
