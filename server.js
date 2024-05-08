const express = require('express');
const bodyParser = require('body-parser');
const generateReport = require('./generateReport');
const sendEmail = require('./sendEmail');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Route to handle form submissions
app.post('/submit', async (req, res) => {
  try {
    // Process form data and generate report
    const reportData = await generateReport(req.body);

    // Send generated report via email
    await sendEmail(reportData.email, reportData.pdfPath);

    res.status(200).json({ message: 'Report generated and sent successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
