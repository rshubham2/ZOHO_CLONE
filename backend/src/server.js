require('dotenv').config({ path: './src/config/.env' });
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./config/database");
const path = require('path');
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/authRoutes");
const passwordResetRoutes = require("./routes/passwordReset");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/password-reset", passwordResetRoutes);

app.use(express.static(path.join(__dirname,"build")));
app.get("/*",(req, res) =>{
    res.sendFile(path.join(__dirname,"build","index.html"))
    });

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
