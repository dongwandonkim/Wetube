import passport from 'passport';
import routes from '../routes';
import User from '../models/User';

export const getJoin = (req, res) => res.render('join', { pageTitle: 'Join' });
//make postJoin as a middleware
export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    //console.log('password not match');
    res.render('join', { pageTitle: 'Join' });
  } else {
    try {
      //register User
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      //when user creates an account then next();
      next();
    } catch (err) {
      //console.log(err);
      //if fail to create acc, redirect
      res.redirect(routes.home);
    }
    //To Do : Log user in
  }
};

export const getLogin = (req, res) =>
  res.render('login', { pageTitle: 'Login' });

export const postLogin = passport.authenticate('local', {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const githubLogin = passport.authenticate('github');

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl: avatar_url,
    });
    return cb(null, newUser);
  } catch (err) {
    return cb(err);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

//google login
export const googleLogin = passport.authenticate('google', {
  scope: ['profile'],
});
export const googleLoginCallback = (accessToken, refreshToken, profile, cb) => {
  console.log(accessToken, refreshToken, profile, cb);
};
export const postGoogleLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  //to do : process logout
  req.logOut();
  req.session.destroy((error) => {
    res.clearCookie('connect.sid');
    res.redirect(routes.home);
  });
  // res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render('userDetail', { pageTitle: 'User Detail', user: req.user });
};
//export const users = (req, res) => res.send("Users");
export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await await User.findById(id);
    res.render('userDetail', { pageTitle: 'User Detail', user });
  } catch (err) {
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) =>
  res.render('editProfile', { pageTitle: 'Edit Profile' });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? `/${file.path}` : req.user.avatarUrl,
    });
    res.redirect(routes.me);
  } catch (err) {
    //console.log(err);
    res.redirect(routes.editProfile);
  }
};

export const getChangePassword = (req, res) =>
  res.render('changePassword', { pageTitle: 'Change Password' });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword1, newPassword2 },
  } = req;
  try {
    if (newPassword1 !== newPassword2) {
      res.status(400);
      res.redirect(`/users/${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword1);
    res.redirect(routes.me);
  } catch (err) {
    res.status(400);
    res.redirect(`/users/${routes.changePassword}`);
  }
};
