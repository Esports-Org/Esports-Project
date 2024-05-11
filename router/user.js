const express = require("express");
const router = express.Router();
const isAuthenticated= require("../middleware/isAthenticated")
const userController = require("../controller/user");

router.post('/signup', userController.userSignup);
router.post('/login', userController.userLogin);
router.delete('/logout',isAuthenticated, userController.userLogout);

router.get('/profile',isAuthenticated, userController.getUserProfile);
router.put('/editProfile',isAuthenticated, userController.editUserProfile);
router.delete('/deleteProfile',isAuthenticated, userController.deleteProfile);

router.post('/createTournament',isAuthenticated, userController.userCreateTournament);
router.put('/editTournament',isAuthenticated, userController.userEditTournament);
router.delete('/cancelTournament',isAuthenticated, userController.userDeleteTournament);

router.post('/joinTeam',isAuthenticated, userController.joinTeam);
router.post('/joinTournament',isAuthenticated, userController.joinTournament);
router.put('/leaveTeam',isAuthenticated, userController.leaveTeam);
router.put('/withdraw',isAuthenticated, userController.withdrawFromTournament);
router.put('/removeTeam',isAuthenticated, userController.removeTeam);

module.exports = router;