const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

async function generateReport(formData) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const htmlContent = await generateHTML(formData);
    await page.setContent(htmlContent);

    const timestamp = new Date().toISOString().replace(/:/g, '-'); // Generate timestamp
    const pdfFilename = `${formData.name}_${timestamp}_report.pdf`; // Unique filename
    const pdfPath = path.join('reports', pdfFilename); // Construct path
    await page.pdf({ path: pdfPath, format: 'A4' });

    await browser.close();

    return {
      email: formData.email,
      pdfPath: pdfPath
    };
  } catch (error) {
    console.error('Error generating report:', error);
    throw error;
  }
}

async function generateHTML(formData) {
  try {
    const [htmlTemplate, cssStyles] = await Promise.all([
      fs.readFile('template.html', 'utf-8'),
      fs.readFile('styles.css', 'utf-8')
    ]);

    return htmlTemplate
      .replace('{{name}}', formData.name)
      .replace('{{email}}', formData.email)
      .replace('{{customStyles}}', `<style>${cssStyles}</style>`);
  } catch (error) {
    console.error('Error generating HTML:', error);
    throw error;
  }
}

module.exports = generateReport;
