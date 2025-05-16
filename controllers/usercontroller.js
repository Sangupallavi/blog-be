import User from '../models/User.js';
import bcrypt from 'bcrypt';

// ✅ Signup
export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const user = new User({ email, password });
    await user.save();

    res.status(201).json({
      msg: 'User created',
      email: user.email,
      id: user._id           // ✅ Return user ID
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: 'User not found' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: 'Invalid password' });

  res.json({ msg: 'Login successful', email: user.email });
};

// ✅ Reset Password
export const resetPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Compare current password
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return res.status(400).json({ msg: 'Current password is incorrect' });

    // Hash the new password before saving
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword; // Store the hashed password

    await user.save();

    res.json({ msg: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
