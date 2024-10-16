const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');

router.get('/extract-pdf/:filename', pdfController.extractData);

module.exports = router;
