const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
