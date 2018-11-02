const userDetail = (req, res) => {
  res.render("user", { title: "User" });
};

const editProfile = (req, res) => {
  res.render("edit-profile", { title: "Edit Profile" });
};

const myProfile = (req, res) => {
  res.render("me", { title: "Your Profile" });
};

const logIn = (req, res) => {
  res.render("login", { title: "Log In" });
};

export default {
  userDetail,
  editProfile,
  myProfile,
  logIn
};