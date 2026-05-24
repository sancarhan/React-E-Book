const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
// -------------------------------------------------------------------------
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Lütfen tüm alanları doldurun"});
    }

    // Kullanıcı kontrol
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({message: "Kullanıcı zaten mevcut"})
    }

    // KullanıcıOluşturma
    const user = await User.create({name, email, password});

    if (user) {
      res.status(201).json({
        message: "Kullanıcı başarıyla kaydoldu",
        token: generateToken(user._id),
      });
    }else{
      res.status(400).json({ message: "Geçersiz kullanıcı"});
    }

  } catch (error) {
    res.status(500).json({ message: "Server Hatası" });
  }
};
// ---------------------------------------------------------------------
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
  } catch (error) {
    res.status(500).json({ message: "Server Hatası" });
  }
};
// --------------------------------------------------------------------
exports.getProfile = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server Hatası" });
  }
};
// ---------------------------------------------------------------------
exports.updateUserProfile = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server Hatası" });
  }
};

