require("dotenv").config();
const express = require("express");
const app = express();
const apiRoutes = require("./routes/apiRoutes");


app.use(express.json());

app.use("/api", apiRoutes);


app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
