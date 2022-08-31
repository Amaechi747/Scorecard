"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminSchema_1 = __importDefault(require("../models/adminSchema"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailer_service_1 = require("../services/mailer.service");
const stackSchema_1 = __importDefault(require("../models/stackSchema"));
const emailTemplate_1 = __importDefault(require("./emailTemplate"));
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("live-project-scorecard-sq011a:server");
const ADMIN = {
    // Error.prototype.status = 403;
    async createAdmin(data) {
        try {
            //Get data
            const { firstName, lastName, email, password, role, stack } = data;
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
    async getAdmin(id) {
        try {
            // use id to get data from db
            const admin = await adminSchema_1.default.findById(id, { password: 0 }).populate('stack');
            if (admin) {
                return admin;
            }
            else {
                throw new Error("Admin not found!");
            }
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    },
    async updateAdminImage(id, path) {
        try {
            const updateDoc = await adminSchema_1.default.updateOne({ _id: id }, { $set: { imageUrl: path } }, { upsert: true });
            if (updateDoc.modifiedCount) {
                return path;
            }
            else {
                throw new Error("Image not updated");
            }
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    },
    async changeAdminPassword(id, newPass) {
        try {
            const admin = await adminSchema_1.default.findOne({ _id: id });
            const match = await bcryptjs_1.default.compare(newPass, admin?.password);
            if (admin) {
                if (!match) {
                    // Hash new Password
                    // if(oldPass === newPass)
                    const salt = await bcryptjs_1.default.genSalt(10);
                    const hashedPassword = await bcryptjs_1.default.hash(newPass, salt);
                    admin.password = hashedPassword;
                    return await admin.save();
                }
                else {
                    throw new Error("New password may not be the same as previous password");
                    // throw new Error("Current password is wrong");
                }
            }
            else {
                throw new Error("Admin Not found");
            }
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    },
    async create(data) {
        try {
            //Get data
            const { firstName, lastName, email, password, role, stack } = data;
            debug('I reached here!!');
            const stackId = await this.getOneStack(stack);
            const emailSubstring = email.split('@')[1];
            if (emailSubstring !== "decagonhq.com") {
                throw new Error('Please use a valid decagon staff email.');
            }
            // if (emailSubstring !== "decagon.dev") {
            //     throw new Error('Please use a valid decagon staff email.')
            // }
            //Save data
            // Hash Password
            const salt = await bcryptjs_1.default.genSalt(10);
            const hashedPassword = await bcryptjs_1.default.hash(password, salt);
            const newAdmin = new adminSchema_1.default({ ...data, password: hashedPassword, stack: stackId });
            const admin = await newAdmin.save();
            if (admin) {
                /********************************** Email Service to admin ************************************/
                //Send email to new Admin
                const { firstName, lastName } = admin;
                const url = `${process.env.BASE_URL}/admin/login`;
                const subject = `Admin Login Details`;
                //Send email to applicant
                const text = `<p>You have recently been added as an admin. <br>
            <span style="text-decoration: underline"> Login details <span> <br>
            <span style="text-decoration: none"> Email:<span> ${email} <br>
            <span style="text-decoration: none"> Password: <span> ${password} <br>
            <span style="text-decoration: none">Go to portal <a href=" http://${url}"> click here </a>. <span></p>`;
                const mail = (0, emailTemplate_1.default)(firstName, text);
                await (0, mailer_service_1.emailService)(email, subject, mail, `${firstName} ${lastName}`);
                /********************************** Email Service to admin ************************************/
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
            const { password, stack } = update;
            if (password) {
                throw new Error("Oops!!! Admin Password cannot be updated by the superadmin");
            }
            //Update
            let stackId;
            if (stack) {
                stackId = await this.getOneStack(stack);
            }
            const updatedAdmin = adminSchema_1.default.findOneAndUpdate(filter, { ...update, stack: stackId }, { new: true });
            if (updatedAdmin) {
                return updatedAdmin;
            }
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    },
    async get() {
        try {
            const getAllAdmin = adminSchema_1.default.aggregate([{
                    $match: {
                        role: {
                            $nin: ['SuperAdmin']
                        }
                    }
                }]);
            return getAllAdmin;
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
                let { email, status, id, firstName, lastName } = admin;
                //Change Status
                status = "active";
                // admin["status"] = status;
                const token = jsonwebtoken_1.default.sign({ status, id }, `${process.env.JWT_SECRET}`, {
                    expiresIn: '1d'
                });
                // const token = jwt.sign({...admin}, `${process.env.JWT_SECRET}`, {
                //     expiresIn: '30d'})
                const subject = `Admin Verification `;
                const url = `${process.env.BASE_URL}/admin/verify?token=${token}`;
                //Send email to applicant
                const text = `<p>Click to be verified as an admin <a href=" http://${url}"> click here </a>.</p>`;
                const mail = (0, emailTemplate_1.default)(firstName, text);
                await (0, mailer_service_1.emailService)(email, subject, mail, `${firstName} ${lastName}`);
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
    },
    /* Stack Operations */
    //view all stacks
    async viewAllStack() {
        try {
            const stacks = await stackSchema_1.default.find({});
            return stacks;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    },
    //create a stack
    async addStack(data) {
        try {
            const stack = new stackSchema_1.default(data);
            await stack.save();
            return stack;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    },
    //edit a stack
    async editStack(id, update) {
        try {
            const stackToEdit = await stackSchema_1.default.findByIdAndUpdate(id, update, { new: true });
            return stackToEdit;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    },
    //delete a stack
    async deleteStack(id) {
        try {
            const stackToDelete = await stackSchema_1.default.findByIdAndDelete(id);
            return stackToDelete;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    },
    //Get a Stack
    async getOneStack(str) {
        try {
            const filter = { name: str };
            const stack = await stackSchema_1.default.findOne(filter);
            if (stack) {
                debug('Stack to be registered: ', stack);
                return stack._id;
            }
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    },
    async getStackById(userId, stackId) {
        try {
            if (userId !== undefined && stackId !== undefined) {
                return await adminSchema_1.default.findOne({ _id: userId, stack: stackId });
            }
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
};
exports.default = ADMIN;
