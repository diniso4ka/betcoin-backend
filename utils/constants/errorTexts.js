const userErrorTexts = {
	NOT_FOUND: 'Пользователь не найден',
	INCORRECT_MAIL: 'Некорректная почта',
	INCORRECT_USERNAME: 'Некорректное имя пользователя',
	INCORRECT_PASSWORD: 'Некорректный пароль',
	INCORRECT_ACTIVATE_LINK: 'Неккоректная ссылка активации',
	INCORRECT_ACCESS_LINK: 'Неккоректная ссылка доступа',
	ALREADY_TO_USE_EMAIL: (email) =>
		`Пользователь с почтовым адресом ${email} уже существует`,
	ALREADY_TO_USE_USERNAME: (username) =>
		`Пользователь с именем ${username} уже существует`,
};

const blogErrorTexts = {};

module.exports = {
	userErrorTexts,
	blogErrorTexts,
};
