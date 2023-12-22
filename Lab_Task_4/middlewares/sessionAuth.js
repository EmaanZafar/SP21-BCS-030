
async function sessionAuth(req, res, next) {
  if (req.session.user && req.session.user.roles.includes('admin')) {
    // If the user has a session and the role is "admin"
    next();
  } else {
    // If the user does not have a session or the role is not "admin"
    req.flash('error', 'Access forbidden. Admin access required.');
    res.redirect('/login'); // Redirect to the login page
  }
}

module.exports = sessionAuth;