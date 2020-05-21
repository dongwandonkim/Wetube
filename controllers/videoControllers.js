import {videos} from "../db"

export const home = (req, res) => {

    //videos(fake db.js) send to home.pug
    res.render("home", {pageTitle: "Home", fakedb:videos});
}

export const search = (req, res) => {
    //console.log(req.query);
    // keyword === searchbox name
    res.render("search", {pageTitle: "Search", searchingBy: req.query.keyword});
}
// export const videos = (req, res) => res.render("videos");
export const videoDetail = (req, res) => res.render("videoDetail", {pageTitle: "Video Detail"});
export const editVideo = (req, res) => res.render("editVideo", {pageTitle: "Edit Video"});
export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle: "Delete Video"});
export const upload = (req, res) => res.render("upload", {pageTitle: "Upload"});