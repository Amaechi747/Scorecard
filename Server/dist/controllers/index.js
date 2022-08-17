"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const adminSchema_1 = __importDefault(require("../models/adminSchema"));
const superAdminRoute = async function (req, res, next) {
    try {
        const data = req.body;
        const defaultPassword = process.env.superUser;
        if (defaultPassword !== undefined) {
            const salt = await bcryptjs_1.default.genSalt(12);
            const hashedSuperPassword = await bcryptjs_1.default.hash(defaultPassword, salt);
            const { firstName, lastName, email, password, role } = data;
            const newSalt = await bcryptjs_1.default.genSalt(12);
            const hashedPassword = await bcryptjs_1.default.hash(password, newSalt);
            if (await bcryptjs_1.default.compare(password, hashedSuperPassword)) {
                const superAdmin = new adminSchema_1.default({
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                    role: "SuperAdmin"
                });
                await superAdmin.save();
                res.status(200).json({
                    message: "Super Admin Created Successfully",
                    data: superAdmin
                });
            }
        }
    }
    catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
};
exports.default = superAdminRoute;
