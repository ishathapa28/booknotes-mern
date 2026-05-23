exports.getMe = async (req, res) => {
  res.json({ userId: req.user.id });
};