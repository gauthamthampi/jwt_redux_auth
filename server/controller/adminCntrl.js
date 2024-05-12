import User from "../model/userConifg.js";

export const getUserData = async (req, res) => {
    try {
      const users = await User.find({}); // Retrieve all users from the database
      res.status(200).json(users); // Send the retrieved users as JSON response
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

export const adduser = async (req,res) => {
    const {name,email,password} = req.body
    try {
       const existingUser = await User.findOne({email:email});

       if(existingUser){
        return res.status(400).json({message: 'User already exists'})
       }

       const newUser = new User({
        name,
        email,
        password
       });

       await newUser.save()
       res.status(201).json({message:"User created successfully"})
    }catch(error){
        console.error("Error"+error);
        res.status(500).json({message:"Failed to create the user"})
    }
  }


export const getEditUser = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
};

// Update user by email
export const putEditUser = async (req, res) => {
  const { email } = req.params;
  const { name } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate({ email }, { name }, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update user' });
  }
};

export const deleteUser = async (req, res) => {
  const { email } = req.params;

  try {
    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};


export const deleteEmail = async (req,res) => {
  const { email }  = req.params;

  try{
    const user = await User.findOne({email:email})

    user.email = ''
    user.save();
    res.status(200).json({message : "Email removed"})
  }catch{

  }
}