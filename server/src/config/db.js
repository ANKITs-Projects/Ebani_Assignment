const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Options to help with stability
        await mongoose.connect(process.env.MONGO_DB_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 10s
        });
        console.log("DB Connection Successful");
    } catch (err) {
        console.error(`DB connection failed: ${err.message}`);
        // Exit process with failure if you can't connect
        process.exit(1);
    }
};

connectDB();