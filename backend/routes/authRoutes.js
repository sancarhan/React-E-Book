// const express = require("express");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const router = express.Router();

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
// };

// // POST /api/auth/register
// router.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     // TODO: implement registration logic
//     return res.status(501).json({ message: "registerUser not implemented" });
//   } catch (error) {
//     return res.status(500).json({ message: "Server Hatası" });
//   }
// });

// // POST /api/auth/login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     // TODO: implement login logic
//     return res.status(501).json({ message: "loginUser not implemented" });
//   } catch (error) {
//     return res.status(500).json({ message: "Server Hatası" });
//   }
// });

// // GET /api/auth/profile
// router.get("/profile", async (req, res) => {
//   try {
//     // TODO: implement profile fetch logic
//     return res.status(501).json({ message: "getProfil not implemented" });
//   } catch (error) {
//     return res.status(500).json({ message: "Server Hatası" });
//   }
// });

// // PUT /api/auth/profile
// router.put("/profile", async (req, res) => {
//   try {
//     // TODO: implement profile update logic
//     return res.status(501).json({ message: "updateUserProfile not implemented" });
//   } catch (error) {
//     return res.status(500).json({ message: "Server Hatası" });
//   }
// });

// module.exports = router;


const express = require('express');
const {registerUser, loginUser, getProfile, updateUserProfile} = require('../controllers/authController');
const {protect} = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
