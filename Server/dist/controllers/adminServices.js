"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivateDecadev = exports.activateDecadev = exports.deleteDecadev = exports.updateDecadev = exports.createDecadev = exports.checkDecadev = void 0;
const adminServiceSchema_1 = require("../models/adminServiceSchema");
//Function to fetch decadev email from database
const checkDecadev = async (decadev) => {
    const decadevEmail = await adminServiceSchema_1.Decadev.find({ email: decadev.email });
    return decadevEmail;
};
exports.checkDecadev = checkDecadev;
//Controller for Admin to create an Account for decadevs
const createDecadev = async (req, res, next) => {
    try {
        let decadevExist = await (0, exports.checkDecadev)(req.body);
        if (decadevExist.length > 0) {
            throw new Error('Decadev already exists');
        }
        const newDecadev = new adminServiceSchema_1.Decadev({
            firstNName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            stack: req.body.stack,
            squad: req.body.squad
        });
        const decadev = await newDecadev.save();
        res.status(200).send('Decadev successfully registered');
    }
    catch (err) {
        res.render('error');
    }
};
exports.createDecadev = createDecadev;
//Controller for Admin to update the details of a decadev
const updateDecadev = async (req, res, next) => {
    try {
        const decadev = await adminServiceSchema_1.Decadev.findById(req.params.id);
        if (!decadev)
            return;
        decadev.firstName = req.body.firstname;
        decadev.lastName = req.body.lastname;
        decadev.email = req.body.email;
        decadev.stack = req.body.stack;
        decadev.squad = req.body.squad;
        decadev.save();
        return res.status(200).send("Decadev Updated Successfully!");
    }
    catch (err) {
        return res.status(400).send("Decadev Not Found!");
    }
};
exports.updateDecadev = updateDecadev;
//Controller for Admin to delete a Decadev's account
const deleteDecadev = async (req, res, next) => {
    try {
        const decadev = await adminServiceSchema_1.Decadev.findById(req.params.id);
        await decadev.remove();
        return res.status(200).send("Decadev Deleted Successfully!");
    }
    catch (err) {
        return res.status(400).send("Decadev Not Found!");
    }
};
exports.deleteDecadev = deleteDecadev;
//Controller to Activate the account of Decadev
const activateDecadev = async (req, res, next) => {
    try {
    }
    catch (err) {
        return res.status(400).send("Decadev Not Found");
    }
};
exports.activateDecadev = activateDecadev;
//Controller to Deactivate the account of Decadev
const deactivateDecadev = async (req, res, next) => {
    try {
    }
    catch (err) {
        return res.status(400).send("Decadev Not Found");
    }
};
exports.deactivateDecadev = deactivateDecadev;
