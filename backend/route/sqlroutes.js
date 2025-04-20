import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import User from '../model/mysqluser.js'; 

const router = express.Router();

// ✅ Register User
router.post('/users', [
  body('firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
  body('lastName').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
  body('email').isEmail().withMessage('Invalid email'),
  body('phone').isLength({ min: 10, max: 10 }).withMessage('Phone must be 10 digits'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], async (req, res) => {
  console.log('🔍 Incoming Request Body:', req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { firstname, lastName, email, phone, time, date, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstname,
      lastName,
      email: email.toLowerCase(),
      phone,
      time,
      date,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User created', user: newUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Login Route
router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email: email.toLowerCase() } });

    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get All Users
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err); // ✅ ADD this line
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get User by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update User
router.put('/users/:id', async (req, res) => {
  try {
    const [updated] = await User.update(req.body, { where: { id: req.params.id } });

    if (!updated) return res.status(404).json({ message: 'User not found or not updated' });

    const updatedUser = await User.findByPk(req.params.id);
    res.status(200).json({ message: 'User updated', user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete User
router.delete('/users/:id', async (req, res) => {
  const userId = Number(req.params.id);
  console.log('Attempting to delete user with ID:', userId);  // Log the ID

  try {
    const deleted = await User.destroy({ where: { id: userId } });
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    console.error('Error in deleting user:', err); // Log the error for more details
    res.status(500).json({ error: err.message });
  }
});

export default router;
