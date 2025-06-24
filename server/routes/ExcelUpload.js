const express = require('express');
const router = express.Router();
const xlsx = require('xlsx');
const upload = require('../middleware/upload'); // memory storage multer
const ExcelData = require('../models/ExcelData'); // your mongoose model

router.post('/upload', upload.single('file'), async (req, res) => {
  console.log("Received File:", req.file); // ← Add this

  try {
    if (!req.file) {  
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    await ExcelData.insertMany(jsonData);
    res.status(200).json({ message: 'Upload successful', data: jsonData });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: 'Upload failed', error });
  }
});


// Fetch route - get saved Excel data from MongoDB
router.get('/data', async (req, res) => {
  try {
    const data = await ExcelData.find({});
    res.status(200).json(data);
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ message: 'Failed to fetch data', error });
  }
});

module.exports = router;