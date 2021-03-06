import routes from '../routes';
import Video from '../models/Video';

export const home = async (req, res) => {
  try {
    // video list sorted newest first
    const videos = await Video.find({}).sort({ _id: -1 });

    res.render('home', { pageTitle: 'Home', videos });
  } catch (err) {
    //if videos return err then give video: empty array
    res.render('home', { pageTitle: 'Home', videos: [] });
  }
};

export const search = async (req, res) => {
  const {
    query: { keyword: searchingBy },
  } = req;
  let videos = [];
  try {
    //search that contains the keyword, option=case insensitive
    videos = await Video.find({
      title: { $regex: searchingBy, $options: 'i' },
    });
  } catch (err) {
    console.log(err);
  }
  //console.log(req.query);
  // keyword === searchbox name
  res.render('search', { pageTitle: 'Search', searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render('upload', { pageTitle: 'Upload' });
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  //To do : Upload and save video
  res.redirect(routes.videoDetail(newVideo.id));
};

// export const videos = (req, res) => res.render("videos");
export const videoDetail = async (req, res) => {
  //get video id(/videos/:id)
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findById(id).populate('creator');
    res.render('videoDetail', { pageTitle: video.title, video });
  } catch (err) {
    //console.log(err);
    res.redirect(routes.home);
  }
};
//Edit Video
export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (String(video.creator) !== req.user.id) {
      throw Error();
    } else {
      res.render('editVideo', { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (err) {
    res.redirect(routes.home);
  }
};
export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (err) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (String(video.creator) !== req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
    res.redirect(routes.home);
  } catch (err) {
    res.redirect(routes.home);
  }
};
