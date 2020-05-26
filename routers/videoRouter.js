import express from 'express';
import routes from '../routes';
import {
  //videos,
  videoDetail,
  getEditVideo,
  deleteVideo,
  getUpload,
  postUpload,
  postEditVideo,
} from '../controllers/videoControllers';
import { uploadVideo, onlyPrivate } from '../middlewares';

const videoRouter = express.Router();

//upload Video
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

//Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

//Edit Video
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

videoRouter.get(routes.deleteVideo(), deleteVideo);

export default videoRouter;
