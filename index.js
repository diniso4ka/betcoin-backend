require('dotenv').config();
const express = require('express');
const ws = require('mongodb');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);
app.use(errorMiddleware);

const PORT = process.env.PORT;
async function start() {
	try {
		await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
	} catch (err) {
		console.log(err);
	}
}
// const wss = new ws.WebSocketServer(
// 	{
// 		port: 4000,
// 	},
// 	() => console.log('WS server started on PORT = 4000'),
// );
//
// wss.on('connection', function connection(ws) {});
//
start();
