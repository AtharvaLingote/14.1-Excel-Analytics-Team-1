const mongoose = require('mongoose');

const ExcelDataSchema = new mongoose.Schema({}, { strict: false });

module.exports = mongoose.model('ExcelData', ExcelDataSchema);
