const express = require('express'); const fs = require('fs'); const path = require('path'); const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json()); app.use(express.static(path.join(__dirname, '/')));

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });

app.get('/api/data', (req, res) => { fs.readFile('data.json', 'utf8', (err, data) => { if (err) return res.status(500).json({ error: 'Read Error' }); res.json(JSON.parse(data || '[]')); }); });

app.post('/api/data', (req, res) => { const newData = req.body; fs.readFile('data.json', 'utf8', (err, data) => { let json = []; if (!err && data) { try { json = JSON.parse(data); } catch (e) { json = []; } } json.push(newData); fs.writeFile('data.json', JSON.stringify(json, null, 2), (err) => { if (err) return res.status(500).json({ error: 'Save Error' }); res.status(200).json({ message: 'Success' }); }); }); });

app.listen(PORT, '0.0.0.0', () => { console.log('Server is running'); });