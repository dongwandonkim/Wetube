const express = require('express');
import morgan from  "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();

import "core-js";

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"))

app.get('/', function (req, res){
   res.send('hello world');
});

app.listen(3000, console.log('servers running on port 3000'));