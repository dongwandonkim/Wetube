// Global
const HOME = '/';
const JOIN = '/join';
const LOGIN = '/login';
const LOGOUT = '/logout';
const SEARCH = '/search';

// Users
const USERS = '/users';
const USER_DETAIL = '/:id';
const EDIT_PROFILE = '/editprofile';
const CHANGE_PASSWORD = '/changepassword';
const ME = '/me';

// Videos
const VIDEOS = '/videos';
const UPLOAD = '/upload';
const VIDEO_DETAIL = '/:id';
const EDIT_VIDEO = '/:id/edit';
const DELETE_VIDEO = '/:id/delete';

//GITHUB AUTH
const GITHUB = '/auth/github';
const GITHUB_CALLBACK = '/auth/github/callback';

//FACEBOOK
const FB = '/auth/facebook';
const FB_CALLBACK = '/auth/facebook/callback';

//GOOGLE
const GOOGLE = '/auth/google';
const GOOGLE_CALLBACK = '/auth/google/callback';

const routes = {
  me: ME,
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: (id) => {
    if (id) {
      return `/users/${id}`;
    } else {
      return USER_DETAIL;
    }
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  videoDetail: (id) => {
    if (id) {
      return `/videos/${id}`;
    } else {
      return VIDEO_DETAIL;
    }
  },
  editVideo: (id) => {
    if (id) {
      return `/videos/${id}/edit`;
    } else {
      return EDIT_VIDEO;
    }
  },

  deleteVideo: (id) => {
    if (id) {
      return `/videos/${id}/delete`;
    } else {
      return DELETE_VIDEO;
    }
  },
  upload: UPLOAD,
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  facebook: FB,
  facebookCallback: FB_CALLBACK,
  google: GOOGLE,
  googleCallback: GOOGLE_CALLBACK,
};

export default routes;
