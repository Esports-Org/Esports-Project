const express = require("express");
const router = express.Router();

const userController = require("../controller/user");

router.post('/signup', userController.userSignup);
router.post('/login', userController.userLogin);
router.delete('/logout', userController.userLogout);

router.get('/profile', userController.getUserProfile);
router.put('/editProfile', userController.editUserProfile);
router.delete('/deleteProfile', userController.deleteProfile);

router.post('/createTournament', userController.userCreateTournament);
router.put('/editTournament', userController.userEditTournament);
router.delete('/cancelTournament', userController.userDeleteTournament);

router.post('/joinTeam', userController.joinTeam);
router.post('/joinTournament', userController.joinTournament);
router.put('/leaveTeam', userController.leaveTeam);
router.put('/withdraw', userController.withdrawFromTournament);
router.put('/removeTeam', userController.removeTeam);

module.exports = router;