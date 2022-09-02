"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminSchema_1 = __importDefault(require("../models/adminSchema"));
const decadevSchema_1 = __importDefault(require("../models/decadevSchema"));
const User = {
    async verify(data) {
        const { email, password } = data;
        const emailSubstring = email.split('@')[1];
        //Admin verification
        if (emailSubstring === "decagonhq.com") {
            const filter = { email };
            const isAdmin = await adminSchema_1.default.findOne(filter);
            if (isAdmin) {
                //Get details
                const hashedPassword = isAdmin.password;
                if (await bcryptjs_1.default.compare(password, hashedPassword)) {
                    const { _id, email } = isAdmin;
                    const userData = { _id, email };
                    const token = this.generateToken(userData);
                    const admin = {
                        id: isAdmin._id,
                        firstName: isAdmin.firstName,
                        lastName: isAdmin.lastName,
                        email: isAdmin.email,
                        stack: isAdmin.stack,
                        role: isAdmin.role,
                        phoneNo: isAdmin.phoneNo,
                        squad: isAdmin.squad,
                        status: isAdmin.status
                    };
                    const data = { token, admin };
                    return data;
                }
                throw new Error('Invalid email or Password');
            }
            else {
                throw new Error('Invalid email or Password');
            }
        }
        // Decadev verification
        if (emailSubstring === "decagon.dev" || "gmail.com") {
            const filter = { email };
            const isDecadev = await decadevSchema_1.default.findOne(filter);
            console.log(isDecadev);
            if (isDecadev) {
                const hashedPassword = isDecadev.password;
                if (await bcryptjs_1.default.compare(password, hashedPassword)) {
                    const { _id, email } = isDecadev;
                    const userData = { _id: isDecadev._id, email: isDecadev.email };
                    const token = this.generateToken(userData);
                    const decadevDetails = {
                        id: isDecadev._id,
                        firstName: isDecadev.firstName,
                        lastName: isDecadev.lastName,
                        email: isDecadev.email,
                        stack: isDecadev.stack,
                        phoneNo: isDecadev.phoneNo,
                        squad: isDecadev.squad,
                        status: isDecadev.status
                    };
                    const data = { token, decadevDetails };
                    return data;
                }
                throw new Error('Invalid email or Password');
            }
            else {
                throw new Error('Invalid email or Password');
            }
        }
        throw new Error('Oops!, Email must be a valid Decagon user email.');
    },
    async logout() {
    },
    // Generate Token
    generateToken(id) {
        if (process.env.JWT_SECRET) {
            const token = jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
                expiresIn: '2d',
            });
            return token;
        }
    }
};
exports.default = User;
