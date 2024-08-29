const { GoogleGenerativeAI } = require("@google/generative-ai");
const pdfParse = require('pdf-parse');
const jsdom = require('jsdom');
const fs = require('fs').promises;

const genAI = new GoogleGenerativeAI('AIzaSyCp4IeoH9GupO474BzoNx77B7WZptTaU9s');

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Replace with the path to your folder containing PDF and HTML files
const folderPath = './source';

// Function to extract text from PDF and HTML
async function extractText(filePath) {
  if (filePath.endsWith('.pdf')) {
    // Read PDF file using pdf-parse
    const dataBuffer = await fs.readFile(filePath);
    const { text } = await pdfParse(dataBuffer);
    return text;
  } else if (filePath.endsWith('.html')) {
    // Read HTML file using jsdom (same as before)
    const dom = new jsdom.JSDOM(await fs.readFileSync(filePath, 'utf8'));
    const text = dom.window.document.body.textContent;
    return text;
  } else {
    throw new Error('Unsupported file format');
  }
}

// Function to read and process files
async function processFiles() {
  const files = await fs.readdir(folderPath);
  for (const file of files) {
    const filePath = `${folderPath}/${file}`;
    const text = await extractText(filePath);
    const prompt = `Who is the contact person for the Bidder? :\n${text}`;
    const result = model.generateContent([prompt]);
    result.then(function(data) {
      console.log(data.response.text());
    });
  }
}

// Call the function to process files
processFiles();