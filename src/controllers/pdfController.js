const pdfService = require('../services/pdfService');
const path = require('path');
const fs = require('fs');

const extractData = async (req, res) => {
  try {
    const { filename } = req.params;
    const pdfPath = path.join(__dirname, '../../pdfs', filename);

    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({ error: 'Arquivo não encontrado' });
    }

    const extractedData = await pdfService.extractSpecificData(pdfPath);

    return res.status(200).json({
      message: 'Dados do PDF extraídos com sucesso!',
      data: extractedData
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  extractData
};
