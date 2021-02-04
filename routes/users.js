const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const users = require(path.join(__dirname, '../users.json'));

router.get('/', (req, res) => {
	const { search } = req.query;
	let obj = { count: 0, users: users };
	obj.count = users.reduce((acc) => {
		acc++;
		return acc;
	}, 0);
	if (search) {
		let usersFilter = users.filter((user) => user.name.includes(search));
		return res.json({ count: usersFilter.length, users: usersFilter });
	}
	return res.json(obj);
});

router.get('/:userId', (req, res) => {
	// req.params || req.query || req.body
	const { userId } = req.params;
	const found = users.find(
		(user) => user.id.toString() === userId.toString()
	);
	if (found) {
		return res.json(found);
	}
	return res.status(404).json({ message: 'User Not Found' });
});

router.put('/:userId', (req, res, next) => {
	const { userId } = req.params;
	const { lat } = req.body;
	if (!lat) return res.sendStatus(400);
	const foundIndex = users.findIndex(
		(user) => user.id.toString() === userId.toString()
	);
	users[foundIndex].address.geo.lat = lat.toString();
	res.status(201).json(users[foundIndex]);
	return next();
});

router.delete('/:userId', (req, res) => {
	const { userId } = req.params;
	const foundIndex = users.findIndex(
		(user) => user.id.toString() === userId.toString()
	);
	//[1,2,3,4]
	//users.splice(0, 2)
	//[3,4]
	//users.splice(1, 1)
	//[1,3,4]
	users.splice(foundIndex, 1);
	return res.sendStatus(200);
});

router.use((req, res) => {
	console.log('write');
	fs.writeFileSync(
		path.join(__dirname, '/../users.json'),
		JSON.stringify(users)
	);
});

module.exports = router;
