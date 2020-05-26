import express from 'express';
import passport from 'passport';
import routes from '../routes';
import { home, search } from '../controllers/videoControllers';
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  githubLogin,
  postGithubLogin,
  getMe,
  googleLogin,
  postGoogleLogin,
  //facebookLogin,
  //postFacebookLogin,
} from '../controllers/userControllers';
import { onlyPublic, onlyPrivate } from '../middlewares';

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
//user creates an account if successful then postLogin
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

globalRouter.get(routes.github, githubLogin);

globalRouter.get(
  routes.githubCallback,
  passport.authenticate('github', { failureRedirect: '/login' }),
  postGithubLogin
);
globalRouter.get(routes.me, getMe);

globalRouter.get(routes.google, googleLogin);
globalRouter.get(
  routes.googleCallback,
  passport.authenticate('google', { failureRedirect: '/login' }),
  postGoogleLogin
);

// globalRouter.get(routes.facebook, facebookLogin);
// globalRouter.get(
//   routes.facebookCallback,
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   postFacebookLogin
// );

export default globalRouter;
