/* FUNCTIONS */
const authenticate = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');  // ??
    } else {
        next();
    }
}

function getDate(date) {
    return `${new Date(date).getMonth()}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
}

/* EXPORTS */
module.exports = { authenticate, getDate };