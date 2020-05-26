import passport from 'passport';
import routes from './routes';
import GithubStrategy from 'passport-github';
//import FacebookStrategy from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth20';
import User from './models/User';
import {
  githubLoginCallback,
  googleLoginCallback,
  //facebookLoginCallback,
} from './controllers/userControllers';

passport.use(User.createStrategy());
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      redirect_uri: `http://localhost:3000${routes.githubCallback}}`,
    },
    githubLoginCallback
  )
);

//Google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `http://localhost:3000/auth/google/callback}`,
    },
    googleLoginCallback
  )
);

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FB_ID,
//       clientSecret: process.env.FB_SECRET,
//       callbackURL: `https://673c824c.ngrok.io${routes.facebookCallback}`,
//       profileFields: ['id', 'displayName', 'photos', 'email'],
//       scope: ['public_profile', 'email'],
//     },
//     facebookLoginCallback
//   )
// );
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
