"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customerRoutes = (0, express_1.Router)();
const customer_model_1 = require("../schemas/customer.model");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
customerRoutes.get('/create', (req, res) => {
    res.render("createCustomer");
});
customerRoutes.post('/create', upload.none(), async (req, res) => {
    try {
        const customerNew = new customer_model_1.Customer(req.body);
        const customer = await customerNew.save();
        if (customer) {
            res.redirect("/customers/list?offset=0&limit=3");
        }
        else {
            res.render("error");
        }
    }
    catch (err) {
        res.render("error");
    }
});
customerRoutes.post('/update', upload.none(), async (req, res) => {
    try {
        const customer = await customer_model_1.Customer.findOne({ _id: req.body.id });
        customer.fullname = req.body.fullname;
        customer.id = req.body.id;
        customer.email = req.body.email;
        customer.phone = req.body.phone;
        await customer.save();
        if (customer) {
            res.redirect("/customers/list?offset=0&limit=3");
        }
        else {
            res.render("error");
        }
    }
    catch (err) {
        res.render("error");
    }
});
customerRoutes.get('/list', async (req, res) => {
    try {
        console.log(req.query);
        let limit;
        let offset;
        if (!req.query.offset || !req.query.limit) {
            limit = 1;
            offset = 0;
        }
        else {
            limit = Number(req.query.limit);
            offset = Number(req.query.offset);
        }
        const customers = await customer_model_1.Customer.find().limit(limit).skip(offset);
        res.render("listCustomer", { customers: customers });
    }
    catch (_a) {
        res.render("error");
    }
});
customerRoutes.get('/update/:id', async (req, res) => {
    try {
        const customer = await customer_model_1.Customer.findOne({ _id: req.params.id });
        console.log(customer, 'customer');
        if (customer) {
            res.render("updateCustomer", { customer: customer });
        }
        else {
            res.render("error");
        }
    }
    catch (err) {
        res.render("error");
    }
});
customerRoutes.get('/delete/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        const customer = await customer_model_1.Customer.findOne({ _id: req.params.id });
        if (customer) {
            await customer.remove();
            res.redirect("/customers/list?offset=0&limit=3");
        }
        else {
            res.render("error");
        }
    }
    catch (err) {
        res.render("error");
    }
});
exports.default = customerRoutes;
//# sourceMappingURL=customer.router.js.map