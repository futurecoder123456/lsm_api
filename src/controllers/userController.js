import prisma from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// --------------------
// SIGN UP (REGISTER USER)
// --------------------
export async function signupController(req, res, next) {
  try {
    const {
      name,
      email,
      password,
      role,
      dateJoined,
      userDob,
      feesPaid,
      booksLoaned,
    } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || 'USER',
        dateJoined: dateJoined ? new Date(dateJoined) : new Date(),
        userDob: new Date(userDob),
        feesPaid: feesPaid ? Number(feesPaid) : 0,
        booksLoaned: booksLoaned ? Number(booksLoaned) : 0,
      },
    });

    res.status(201).json({
      message: 'User created successfully',
      userId: user.userId,
    });
  } catch (err) {
    next(err);
  }
}

// --------------------
// LOGIN USER
// --------------------
export async function loginController(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        userId: user.userId,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (err) {
    next(err);
  }
}

// --------------------
// GET ALL USERS (ADMIN ONLY LATER)
// --------------------
export async function getAllUsersController(req, res, next) {
  try {
    const users = await prisma.user.findMany({
      include: {
        reviews: true,
        loans: true,
      },
    });

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

// --------------------
// GET USER BY ID
// --------------------
export async function getUserByIdController(req, res, next) {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: { userId: Number(userId) },
      include: {
        reviews: true,
        loans: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

// --------------------
// CREATE USER (ADMIN ONLY LATER)
// --------------------
export async function createUserController(req, res, next) {
  try {
    const {
      name,
      email,
      password,
      role,
      dateJoined,
      userDob,
      feesPaid,
      booksLoaned,
    } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || 'USER',
        dateJoined: dateJoined ? new Date(dateJoined) : new Date(),
        userDob: new Date(userDob),
        feesPaid: feesPaid ? Number(feesPaid) : 0,
        booksLoaned: booksLoaned ? Number(booksLoaned) : 0,
      },
    });

    res.status(201).json({
      message: 'User created successfully',
      userId: user.userId,
    });
  } catch (err) {
    next(err);
  }
}

// --------------------
// UPDATE USER
// --------------------
export async function updateUserController(req, res, next) {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: { userId: Number(userId) },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const {
      name,
      userDob,
      feesPaid,
      booksLoaned,
    } = req.body;

    const updatedUser = await prisma.user.update({
      where: { userId: Number(userId) },
      data: {
        ...(name && { name }),
        ...(userDob && { userDob: new Date(userDob) }),
        ...(feesPaid !== undefined && { feesPaid: Number(feesPaid) }),
        ...(booksLoaned !== undefined && { booksLoaned: Number(booksLoaned) }),
      },
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

// --------------------
// DELETE USER
// --------------------
export async function deleteUserController(req, res, next) {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: { userId: Number(userId) },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await prisma.user.delete({
      where: { userId: Number(userId) },
    });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
}

