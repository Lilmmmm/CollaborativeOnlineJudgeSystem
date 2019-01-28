var express = require("express");
var app = express()
var restRouter = require("./routes/rest");
var indexRouter = require("./routes/index");
var mongoose = require("mongoose");
var path = require('path');

mongoose.connect("mongodb://myl:1234qwer@ds213715.mlab.com:13715/onlinejudgesystem")

app.use(express.static(path.join(__dirname, '../public')));

const port = 3000

app.use('/', indexRouter);
app.use("/api/v1", restRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
