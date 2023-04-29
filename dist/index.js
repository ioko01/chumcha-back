"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const firebase_1 = require("./utils/firebase");
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const serverless_http_1 = __importDefault(require("serverless-http"));
(0, dotenv_1.config)();
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
app.get("/add/menu", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const menu = {
        name: "แดงโซดา",
        category: "อิตาเลี่ยนโซดา",
        price: 25,
        image: "",
        createdAt: new Date(),
        updatedAt: new Date()
    };
    const dataRef = firebase_1.db.collection('menu');
    dataRef.add(menu).then(() => {
        res.json(`Data added Successfully`);
    });
}));
app.get("/get/menu", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dataRef = firebase_1.db.collection('menu');
    const snapshot = yield dataRef.get();
    const data = snapshot.docs.map((doc) => doc.data());
    res.json(data);
}));
app.post("/confirm/menu", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const dataRef = firebase_1.db.collection('confirmBills');
    const date = new Date();
    data.map(val => {
        val.createdAt = date;
        val.updatedAt = date;
    });
    dataRef.add({ data }).then(() => {
        res.json(`Data added Successfully`);
    });
}));
app.get("/get/confirm/menu", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dataRef = firebase_1.db.collection('confirmBills');
    const snapshot = yield dataRef.get();
    const data = snapshot.docs.map((doc) => doc.data());
    res.json(data);
}));
// app.listen(PORT, () => {
//     console.log(`Server listen at PORT http://127.0.0.1:${PORT}`);
// });
exports.handler = (0, serverless_http_1.default)(app);
