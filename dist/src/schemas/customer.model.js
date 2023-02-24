"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const mongoose_1 = require("mongoose");
const customerSchema = new mongoose_1.Schema({
    fullname: String,
    id: String,
    email: String,
    phone: String
});
const Customer = (0, mongoose_1.model)('Customer', customerSchema);
exports.Customer = Customer;
//# sourceMappingURL=customer.model.js.map