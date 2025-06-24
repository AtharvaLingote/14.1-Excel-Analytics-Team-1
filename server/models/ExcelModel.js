const mongoose = require('mongoose');

const ExcelSchema = new mongoose.Schema({}, { strict: false });

module.exports = mongoose.model('ExcelData', ExcelSchema);
