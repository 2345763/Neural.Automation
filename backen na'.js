const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB Database
mongoose.connect('mongodb://localhost:27017/neural_automation', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Database connection established.")).catch(err => console.error("Database error:", err));

// Define Inquiry Schema & Model
const inquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: String,
    service: String,
    details: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

// Handle Form Submission Endpoint
app.post('/api/inquiries', async (req, res) => {
    try {
        const { name, email, company, service, details } = req.body;
        
        const newInquiry = new Inquiry({ name, email, company, service, details });
        await newInquiry.save();

        res.status(201).json({ success: true, message: "Transmission received and logged successfully." });
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal transmission failure." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Communication node active on port ${PORT}`));