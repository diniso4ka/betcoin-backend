module.exports = class UserDto {
	email;
	username;
	balance;
	role;
	id;
	isActivated;

	constructor(model) {
		this.email = model.email;
		this.username = model.username;
		this.balance = model.balance;
		this.role = model.role;
		this.id = model._id;
		this.isActivated = model.isActivated;
	}
};
