const fs = require('fs');
const pdfParse = require('pdf-parse');

const extractText = async (pdfPath) => {
  const dataBuffer = fs.readFileSync(pdfPath);
  
  try {
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    throw new Error('Erro ao processar o arquivo PDF');
  }
};

const extractValue = (text, label) => {
  const regex = new RegExp(`${label}\\s+([\\w\\d.,/-]+)`, 'i');
  const match = text.match(regex);
  return match ? match[1] : null;
};

const extractSpecificData = async (pdfPath) => {
  const dataBuffer = fs.readFileSync(pdfPath);

  try {
    const data = await pdfParse(dataBuffer);
    const text = data.text;

    const clienteNumber = extractValue(text, 'Nº DO CLIENTE');
    const energy = extractValue(text, 'Energia Elétrica'); // Quantidade de energia
    const energyValue = extractValue(text, 'Valor \\(R\\$\\)\\s+Energia Elétrica'); // Valor da energia
    const energyICMS = extractValue(text, 'ICMS'); // ICMS da energia
    const energyICMSValue = extractValue(text, 'Valor \\(R\\$\\)\\s+ICMS'); // Valor do ICMS
    const energyGDI = extractValue(text, 'Energia compensada GD I'); // Energia compensada GD I
    const energyGDIValue = extractValue(text, 'Valor \\(R\\$\\)\\s+Energia compensada GD I'); // Valor de GD I
    const contribPublicValue = extractValue(text, 'Contrib Ilum Publica Municipal'); // Contribuição de iluminação pública
    const month = extractValue(text, 'Referente a'); // Mês de referência

    return {
      clienteNumber,
      energy,
      energyValue,
      energyICMS,
      energyICMSValue,
      energyGDI,
      energyGDIValue,
      contribPublicValue,
      month
    };
  } catch (error) {
    throw new Error('Erro ao processar o arquivo PDF');
  }
};

module.exports = {
  extractText,
  extractSpecificData
};
