const express = require("express");
const renderVM = require("./vm");

const app = express();

// Define a route to render our initial HTML.
app.use("/", (req, res) => {
  const html = renderVM({});

  res.send(html);
});

// Launch the server
app.listen(process.env.PORT, () => {
  console.info(`Fake server is running on port ${process.env.PORT}`);
});
