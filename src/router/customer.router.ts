import { Router } from 'express';
const customerRoutes = Router();
import { Customer } from "../schemas/customer.model";

import multer from 'multer';
const upload = multer();


customerRoutes.get('/create', (req, res) => {
    res.render("createCustomer");
});


customerRoutes.post('/create', upload.none(), async (req, res) => {
    try {
        const customerNew = new Customer(req.body);
        const customer = await customerNew.save();
        if (customer) {
            res.redirect("/customers/list?offset=0&limit=3")
        } else {
            res.render("error");
        }
    } catch (err) {
        res.render("error");
    }
});



customerRoutes.post('/update', upload.none(), async (req, res) => {
    try {
        const customer = await Customer.findOne({ _id: req.body.id });
        customer.fullname = req.body.fullname;
        customer.id = req.body.id;
        customer.email = req.body.email;
        customer.phone = req.body.phone;

        await customer.save();
        if (customer) {
            res.redirect("/customers/list?offset=0&limit=3")
        } else {
            res.render("error");
        }
    } catch (err) {
        res.render("error");
    }
});



customerRoutes.get('/list', async (req, res) => {
    try {
        console.log(req.query)
        let limit: number;
        let offset: number;
        if(!req.query.offset || !req.query.limit) {
            limit = 1;
            offset = 0;
        } else {
            limit = Number(req.query.limit as string);
            offset = Number(req.query.offset as string);
        }

        const customers = await Customer.find().limit(limit).skip(offset);
        res.render("listCustomer", { customers: customers });
    } catch {
        res.render("error");
    }
});



customerRoutes.get('/update/:id', async (req, res) => {
    try {
        const customer = await Customer.findOne({ _id: req.params.id });
        console.log(customer, 'customer')
        if (customer) {
            res.render("updateCustomer", {customer: customer})
        } else {
            res.render("error");
        }
    } catch (err) {

        res.render("error");
    }
});



customerRoutes.get('/delete/:id', async (req, res) => {

    try {
        console.log(req.params.id)
        const customer = await Customer.findOne({ _id: req.params.id });

        if (customer) {

            await customer.remove();

            res.redirect("/customers/list?offset=0&limit=3")

        } else {

            res.render("error");

        }

    } catch (err) {

        res.render("error");

    }

});





export default customerRoutes;
