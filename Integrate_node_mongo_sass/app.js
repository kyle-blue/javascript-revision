const express = require("express");
const app = express();


app.use(require("./routes"));
app.use(express.static("./public"));


const PORT = process.env.port || 8000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));