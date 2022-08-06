"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminSchema_1 = __importDefault(require("../models/adminSchema"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailer_1 = require("../services/mailer");
const ADMIN = {
    async create(data) {
        try {
            //Get data
            const { firstName, lastName, email, password, role, stack } = data;
            const emailSubstring = email.split('@')[1];
            // if(emailSubstring !== "decagonhq.com"){
            //     throw new Error('Please use a valid decagon staff email.')
            // }
            if (emailSubstring !== "decagon.dev") {
                throw new Error('Please use a valid decagon staff email.');
            }
            //Save data
            // Hash Password
            const salt = await bcryptjs_1.default.genSalt(10);
            const hashedPassword = await bcryptjs_1.default.hash(password, salt);
            const newAdmin = new adminSchema_1.default({ ...data, password: hashedPassword });
            const admin = await newAdmin.save();
            if (admin) {
                return admin;
            }
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    },
    // Edit Admin Details
    async edit(id, update) {
        try {
            //Set filter variable
            const filter = { _id: id };
            //Update
            const updatedAdmin = adminSchema_1.default.findOneAndUpdate(filter, update, { new: true });
            if (updatedAdmin) {
                return updatedAdmin;
            }
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    },
    // Activate Admin
    async activate(id) {
        try {
            //Set filter variable
            const filter = { _id: id };
            //Search for admin in database
            const admin = await adminSchema_1.default.findOne(filter);
            if (admin) {
                let { email, status, id } = admin;
                //Change Status
                status = "active";
                // admin["status"] = status;
                const token = jsonwebtoken_1.default.sign({ status, id }, `${process.env.JWT_SECRET}`, {
                    expiresIn: '1d'
                });
                // const token = jwt.sign({...admin}, `${process.env.JWT_SECRET}`, {
                //     expiresIn: '30d'})
                const url = `${process.env.BASE_URL}/admin/verify?token=${token}`;
                //Send email to applicant
                const text = `<p>Click to be verified as an admin <a href=" http://${url}"> click here </a>.</p>`;
                await (0, mailer_1.emailService)(email, url, text);
                return admin;
            }
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    },
    async verify(token) {
        try {
            if (token) {
                const decoded = jsonwebtoken_1.default.verify(`${token}`, `${process.env.JWT_SECRET}`);
                if (decoded instanceof Object) {
                    const { status, id } = decoded;
                    //Set filter variable
                    const filter = { _id: id };
                    const update = { status };
                    const activatedAdmin = await adminSchema_1.default.findOneAndUpdate(filter, update, { new: true });
                    return activatedAdmin;
                }
            }
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    },
    async deactivate(id) {
        try {
            if (id) {
                //Locate the admin and deactivate
                const filter = { _id: id };
                const update = { status: "inactive" };
                const deactivatedAdmin = await adminSchema_1.default.findOneAndUpdate(filter, update, { new: true });
                return deactivatedAdmin;
            }
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    },
    async delete(id) {
        try {
            if (id) {
                //Find and delete
                const filter = { _id: id };
                const deletedAdmin = await adminSchema_1.default.findOneAndDelete(filter);
                return deletedAdmin;
            }
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
};
exports.default = ADMIN;
