// * IMPORTS
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const connectToMongo = require("./lib/db/mongoose-connect");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

// SECURITY
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// Cloudinary Config
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// * MIDDLEWARES

app.set("trust proxy", 1); // Trust First Proxy
app.use(cookieParser(process.env.CP_SECRET)); // Cookie Parser
app.use(express.urlencoded({ extended: true })); // URL Encoded
app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000, // 15 Minutes
		max: 1000, // limit each IP to 100 requests per window (15 mins)
	})
); // Rate Limited (Prevents Brute Force Attacks)
app.use(express.json()); // Body Parser
app.use(fileUpload({ useTempFiles: true })); // Temporary File Upload for Cloudinary
app.use(helmet()); // Header Security
app.use(
	cors({
		origin: "http://localhost:4200",
		credentials: true,
	})
); // CORS
app.use(xss()); // XSS

// * ROUTES
// auth routes
app.use("/api/v1/auth", require("./routes/auth.routes"));

// tag routes
app.use("/api/v1/tags", require("./routes/tags.routes"));

// user routes
app.use("/api/v1/users", require("./routes/user.routes"));

// * START SERVER & DB
(async () => {
	try {
		await connectToMongo(process.env.MONGO_DB_URI); // 1. Start Database
		// Start the server on the specified PORT and listen for connections
		app.listen(process.env.PORT, () =>
			console.log(`Backend Listening @ ${process.env.SERVER_URL}`)
		); // 2. Start Backend Server
	} catch (err) {
		console.log("ERROR:", err);
	}
})();
