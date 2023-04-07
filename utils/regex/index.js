const mail = /.{1,35}@.{2,10}\..{2,5}/;
const password = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z].{6,20}/g;
const username = /^[0-9a-zA-Z]{2,20}$/;

module.exports = {
	mail,
	password,
	username,
};
