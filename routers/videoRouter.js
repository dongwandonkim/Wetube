import express from 'express';
import routes from '../routes';
import {
  videos,
  videoDetail,
  getEditVideo,
  deleteVideo,
  getUpload,
  postUpload,
  postEditVideo,
} from '../controllers/videoControllers';
import { uploadVideo } from '../middlewares';

const videoRouter = express.Router();

//upload Video
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

//Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

//Edit Video
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

videoRouter.get(routes.deleteVideo(), deleteVideo);

export default videoRouter;
