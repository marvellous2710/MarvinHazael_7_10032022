const express = require('express');
const cors = require('cors');
const router = require("./routes/router.js");

const PORT = process.env.PORT || 4000;

const app = express();

//Security
app.use(cors());
app.use(express.json());
app.use('/api', router);

app.listen(PORT,() => console.log('Server running on port ' + PORT));