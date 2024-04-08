const express = require("express");
const isAuthenticated= require("../middleware/isAthenticated")
const router = express.Router();
const adminController = require("../controller/admin");

router.get('/users', isAuthenticated, adminController.getUsers)
router.get('/admins', isAuthenticated, adminController.getAdmins)
router.get('/user/:id', isAuthenticated, adminController.getUserInfo)
router.put('/ban/:id', isAuthenticated, adminController.banUser);
router.delete('/deleteUser/:id', isAuthenticated, adminController.deleteUser);//


router.post('/createuser', isAuthenticated, adminController.createUser);
router.post('/login', adminController.login);
router.post('/logout', isAuthenticated, adminController.logout);

router.get('/profile', isAuthenticated, adminController.getProfile);
router.put('/editProfile', isAuthenticated, adminController.editProfile);
router.delete('/deleteProfile', isAuthenticated, adminController.deleteProfile);

router.post('/createTournament', isAuthenticated, adminController.createTournament);
router.put('/editTournament/:id', isAuthenticated, adminController.editTournament);
router.put('/cancelTournament/:id', isAuthenticated, adminController.cancelTournament);

router.put('/removeTeam/:id', isAuthenticated, adminController.removeTeam);


module.exports = router;