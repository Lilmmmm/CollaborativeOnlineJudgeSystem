var express = require("express");
var app = express()
var restRouter = require("./routes/rest");
var mongoose = require("mongoose");

mongoose.connect("mongodb://myl:1234qwer@ds213715.mlab.com:13715/onlinejudgesystem")

const port = 3000

app.use("/api/v1", restRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
