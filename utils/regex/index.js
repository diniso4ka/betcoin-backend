const mail = /.{1,35}@.{2,10}\..{2,5}/
const password = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z].{6,20}/g //TODO Поправить regex
const username = /^[a-zA-Z\-]+$/

module.exports = {
    mail,
    password,
    username
}