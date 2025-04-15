export const loginPage = (req, res) => {
  const { err } = req.query;

  res.render('organiser/login', {
    title: 'Organiser Login - Dance Booker',
    error: err ? 'Invalid username or password' : null,
  });
};

export const handleLogin = (req, res) => {
  res.redirect('/organiser/dashboard');
};

export const dashboardPage = (req, res) => {
  res.render('organiser/dashboard', {
    title: 'Organiser Dashboard - Dance Booker',
    user: 'organiser',
  });
};

export const logout = (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/');
};
