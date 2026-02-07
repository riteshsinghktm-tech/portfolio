const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// CHANGE: Pointing specifically to database.json
const DATA_FILE = path.join(__dirname, 'database.json');

// 1. SAVE DATA TO database.json
app.post('/save', (req, res) => {
    const newMessage = {
        name: req.body.name,
        message: req.body.message,
        time: new Date().toLocaleString()
    };

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        let json = [];
        
        // If file exists and isn't empty, parse it
        if (!err && data) {
            try {
                json = JSON.parse(data);
            } catch (parseErr) {
                json = []; 
            }
        }

        json.push(newMessage);

        // Save back to database.json
        fs.writeFile(DATA_FILE, JSON.stringify(json, null, 2), (err) => {
            if (err) {
                console.error("Error writing to database.json:", err);
                return res.status(500).json({ info: "Error saving to database" });
            }
            console.log("Success: Data saved to database.json");
            res.json({ info: "Data Synced to Permanent Storage" });
        });
    });
});

// 2. FETCH DATA FROM database.json
app.get('/all-messages', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err || !data) {
            return res.json([]);
        }
        try {
            res.json(JSON.parse(data));
        } catch (e) {
            res.json([]);
        }
    });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});