const fs = require('fs');

const promisifiedReadFile = function (filename) {
	return new Promise(function (resolve, reject) {
		fs.readFile(filename, function (err, str) {
			if (err) reject(err);
			else resolve(str);
		});
	});
};

module.exports = promisifiedReadFile;
