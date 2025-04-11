import express from 'express';
import { User } from '../model/user.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs'; // ⬅️ add this

const router = express.Router();

// ✅ Create User (POST)
import { hashPassword } from '../utils/testPasswordComparison.js'; // adjust path as needed

router.post('/users', async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await hashPassword(password); // ✅ use helper

    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created', newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// ✅ Login Route (POST)
router.post('/login', [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  const emailNormalized = email.toLowerCase();  // Normalize email to lowercase

  try {
    const user = await User.findOne({ email: emailNormalized });
   // Log user data for debugging

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Debugging bcrypt comparison directly
    const testPassword = password;  // Password entered by user
    const testHash = user.password;  // Password stored in database

    bcrypt.compare(testPassword, testHash).then(isMatch => {
      console.log('Does the password match?', isMatch);  // Log the result
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      res.status(200).json({ message: 'Login successful', user });
    });

  } catch (error) {
    console.error("Login Error:", error);  // Log errors if any
    res.status(500).json({ error: error.message });
  }
});




// ✅ Read All Users (GET)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Read Single User (GET)
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update User (PUT)
router.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User updated', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete User (DELETE)
router.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
