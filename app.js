const express = require('express');
import morgan from  "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter"
import globalRouter from "./routers/globalRouter"

const app = express();

import "core-js";

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"))


//Routers
app.use("/", globalRouter);
app.use('/user', userRouter);
app.use('/video', videoRouter);

//init.js
export default app;