

// const UserModel = require("../Models/user");
const { UserModel } = require("../Models/user"); // destructure

exports.RegisterUser = async (req, res) => {
    try {
        const { name, email, photoUrl } = req.body;
        const userExist =await UserModel.findOne({ email: email });
        if (!userExist) {
            let newUser = new UserModel({name, email, photoUrl});
            await newUser.save();
            return res.status(201).json({ message: "User Registered Successfully",user: newUser });
        }
        
            return res.status(200).json({ message: "welcome Back",user: userExist });
             
}
catch (error) {
        res.status(500).json({ message: error.message,error:"Server Error" });
    } 
}