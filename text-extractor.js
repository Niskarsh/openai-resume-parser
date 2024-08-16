const fs = require('fs');
const pdf = require('pdf-parse');

const extractTextFromPDF = async ({ filePath }) => {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
};

module.exports = {
    extractTextFromPDF,
};

// extractTextFromPDF('./data1.pdf').then((text) => {
//     console.log(text);
// }).catch ((error) => {
//     console.error(error);
// });
