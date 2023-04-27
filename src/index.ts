import express, { Request, Response } from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { db } from "./utils/firebase";
import cors, { CorsOptions } from "cors";
import { IMenu } from "./interfaces/interface_menu";
config();


const PORT = process.env.PORT || 8000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


app.get("/", async (req: Request, res: Response) => {
    const dataRef = db.collection('data');
    const snapshot = await dataRef.get();
    const data = snapshot.docs.map((doc) => doc.data());
    res.json(data);
});

app.post("/confirm/menu", async (req: Request, res: Response) => {
    console.log("object");
    const data: IMenu[] = req.body;
    const dataRef = db.collection('confirmBills');
    const myDocRef = dataRef.doc();
    myDocRef.set({ data }).then(() => {
        res.json(`Data added with ID: ${dataRef.id}`);
    })
});

app.listen(PORT, () => {
    console.log(`Server listen at PORT http://127.0.0.1:${PORT}`);
});