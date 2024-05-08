const express = require('express');
const generateReport = require('./generateReport');
const sendEmail = require('./sendEmail');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle form submissions
app.post('/submit', async (req, res) => {
  try {
    // Call generateReport function with form data from request body
    const formData = req.body;
    const result = await generateReport(formData);

    // Send generated report via email
    console.log(`Name is  ${formData.name}`);
    await sendEmail(result.email, result.pdfPath, formData.name);

    // Send success response with generated report data
    res.status(200).json(result);
  } catch (error) {
    // Handle errors and send error response
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
