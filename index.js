"use strict";
// Cấu hình dự án
//npm init
// npm i -D typescript tsc tsc-watch rimraf @types/express
// npm i express body-parser multer ejs mongoose validator
// npm install @types/mongoose --save-dev
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var mongoose_1 = require("mongoose");
var customer_router_1 = require("./src/router/customer.router");
var PORT = 3000;
var app = (0, express_1.default)();
app.set("view engine", "ejs");
app.set('views', './src/views');
var DB_URL = 'mongodb://127.0.0.1:27017/test2';
mongoose_1.default.connect(DB_URL)
    .then(function () { return console.log('DB Connected!'); })
    .catch(function (error) { return console.log('DB connection error:', error.message); });
app.use(body_parser_1.default.json());
app.use('/customers', customer_router_1.default);
app.listen(PORT, function () {
    console.log("Server is running on http://localhost:3000/customers/create");
});
//npm run start:dev
//# sourceMappingURL=index.js.map