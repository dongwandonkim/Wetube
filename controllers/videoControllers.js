import routes from "../routes";

export const home = (req, res) => {
    //videos(fake db.js) send to home.pug
    res.render("home", {pageTitle: "Home", videos:videos});
}

export const search = (req, res) => {
    const {
        query: { keyword: searchingBy }
    } = req;
    //console.log(req.query);
    // keyword === searchbox name
    res.render("search", {pageTitle: "Search", searchingBy, videos});
}

export const getUpload = (req, res) => 
    res.render("upload", {pageTitle: "Upload"});
export const postUpload = (req, res) => {
    const {
        body: { file, title, description }
    } = req;
    //To do : Upload and save video
    res.redirect(routes.videoDetail(1212121));
};

// export const videos = (req, res) => res.render("videos");
export const videoDetail = (req, res) => res.render("videoDetail", {pageTitle: "Video Detail"});
export const editVideo = (req, res) => res.render("editVideo", {pageTitle: "Edit Video"});
export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle: "Delete Video"});
