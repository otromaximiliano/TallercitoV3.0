const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const axios = require('axios');
const app = express();

const usersRouter = require('./routes/users');
const promisifiedReadFile = require('./utils');

app.use(morgan('dev'));
app.use(express.json());

app.use('/usuarios', usersRouter);

app.get('/cosaslocas', async (req, res) => {
	// axios.get('https://rickandmortyapi.com/api/character').then((datas) => {
	// 	res.json(datas.data);
	// });
	const personajes = await axios.get(
		'https://rickandmortyapi.com/api/character'
	);
	return res.json(personajes.data);
});

app.get('/cosaslocas/2', async (req, res) => {
	// let results;
	// await new Promise((resolve, reject) => {
	// 	fs.readFile('characters.json', 'utf8', (err, data) => {
	// 		if (err) reject(err);
	// 		data = JSON.parse(data);
	// 		resolve(data);
	// 	});
	// });

	// new Promise((resolve, reject) => {
	// 	fs.readFile('characters.json', 'utf8', (err, data) => {
	// 		if (err) reject(err);
	// 		data = JSON.parse(data);
	// 		resolve(data);
	// 	});
	// }).then((data) => {
	// 	res.json(data);
	// });

	// let results = await promisifiedReadFile('characters.json');
	// results = JSON.parse(results);
	// res.json(results);
	promisifiedReadFile('characters.json').then((results) => {
		results = JSON.parse(results);
		return res.json(results);
	});
});

app.listen(4000, () => {
	console.log('me estoy ejecutando en el puerto 4000');
});
