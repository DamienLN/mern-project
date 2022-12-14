const router = require("express").Router();
const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");
const upload = multer();
// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// user
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow);
// multer can cause bug cause its not the lastest version
router.patch("/unfollow/:id", multer, userController.unfollow);

// upload
router.post("/upload", upload.single('file') ,uploadController.uploadProfil);

module.exports = router;
