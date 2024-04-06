const express = require("express");
const router = express.Router();

const adminController = require("../controller/admin");

router.get('/users',adminController.getUser)
router.get('/user/id:',adminController.getUserInfo)
router.put('/ban/id:',adminController.banUser);

router.post('/adduser', adminController.addUser);
router.post('/login', adminController.login);
router.post('/logout', adminController.logout);

router.get('/profile', adminController.getProfile);
router.put('/editProfile', adminController.editProfile);
router.delete('/deleteProfile', adminController.deleteProfile);

router.post('/createTournament', adminController.createTournament);
router.put('/editTournament', adminController.editTournament);
router.delete('/cancelTournament', adminController.deleteTournament);

router.put('/removeTeam', adminController.removeTeam);


module.exports = router;