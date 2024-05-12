import User from "../model/userConifg.js"; 
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const postSignup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const newUser = new User({
      name,
      email,
      password 
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Failed to create user' });
  }
};

export const postLogin = async (req, res) => {
     const { email, password } = req.body;
   
     try {
       const user = await User.findOne({ email });
   
       if (!user) {
         return res.status(401).json({ message: 'Invalid email or password' });
       }
   
     
       const isPasswordValid = await bcrypt.compare(password, user.password);
   
       if (!isPasswordValid) {
         return res.status(401).json({ message: 'Invalid email or password' });
       }
   
       // JWT token
       const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
         expiresIn: '1h' 
       });
   
      
       res.status(200).json({ token , user});
     } catch (error) {
       console.error('Login error:', error);
       res.status(500).json({ message: 'Internal server error' });
     }
   };

  export const getEditUserProf = async (req, res) => {
    const { email } = req.params;
  
    try {
      const user = await User.findOne({ email });
      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Failed to fetch user' });
    }
  };
  export const editProfile = async (req, res) => {
    const { email } = req.params;
  
    try {
      let user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.name = req.body.name || user.name;
  
      if (req.file) {
        user.image = req.file.path;
      }
  
      await user.save();
  
      res.json({ message: 'User updated successfully', user });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Failed to update user' });
    }
  };
  