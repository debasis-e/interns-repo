require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 8080
const dbConnect = require("./config/db");
const { User } = require("./models/User")
const {validateEmail,validatePhoneNumber}= require("./utils/validators");

dbConnect()
app.use(express.json())


app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            message: "Users fetched succesfully.",
            users
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            err
        })
    }

})
app.post("/adduser", async (req, res) => {
    try {
        const { user_name, email, phone_no, desc } = req.body;
        // console.log(req.body)
        // function validatePhoneNumber(phoneNumber) {
        //     const pattern = /^\d{3}-\d{3}-\d{4}$/;
        //     return pattern.test(phoneNumber);
        // }
        // function validateEmail(email) {
        //     const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        //     return pattern.test(email);
        // }
        let error = "";
        if (user_name == "" && error == "") {
            error = "Please enter the user name"
        }
        else if (email == "" && error == "") {
            error = "Please enter the email"
        }
        else if (phone_no == "" && error == "") {
            error = "Please enter the phone_no"
        }
        else if (desc == "" && error == "") {
            error = "Please enter the description"
        }
        else if (!validateEmail(email)) {
            error = "Please enter a valid email"
        }

        else if (!validatePhoneNumber(phone_no)) {
            error = "Please enter a valid phone Number"
        }

        if (error == "") {
            const userObj = { user_name, email, phone_no, desc };
            const user = new User(userObj);
            await user.save();

            return res.status(201).json({
                "message": "User added Succesfully"
            })
        }
        else {
            return res.status(400).json({
                error
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            err
        })
    }

})

app.put("/update/:user_name", async (req, res) => {
    const user_name = req.params.user_name;
    const { newEmail, newPhoneNo, newDesc } = req.body;
    try {
        // function validatePhoneNumber(phoneNumber) {
        //     const pattern = /^\d{3}-\d{3}-\d{4}$/;
        //     return pattern.test(phoneNumber);
        // }
        // function validateEmail(email) {
        //     const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        //     return pattern.test(email);
        // }

        let error = "";

        if (newEmail == "" && error == "") {
            error = "Please enter the email"
        }
        else if (newPhoneNo == "" && error == "") {
            error = "Please enter the phone_no"
        }
        else if (newDesc == "" && error == "") {
            error = "Please enter the description"
        }
        else if (!validateEmail(newEmail)) {
            error = "Please enter a valid email"
        }

        else if (!validatePhoneNumber(newPhoneNo)) {
            error = "Please enter a valid phone Number"
        }
        if (error == "") {
            const users = await User.findOne({ user_name })
            // console.log(users._id)
            const userObj = { user_name: user_name, email: newEmail, phone_no: newPhoneNo, desc: newDesc }
            // console.log(userObj)
            await User.findByIdAndUpdate(users._id, userObj)
            return res.json({
                message: "User Updated Succesfully",
            })
        }
        else {
            return res.status(400).json({
                error
            })
        }

    } catch (err) {
        return res.status(500).json({
            message: "Something went Wrong",
            err
        })
    }
})

app.delete("/del", async (req, res) => {
    const { user_name } = req.body;
    console.log(user_name);
    try {
        const users = await User.findOne({ user_name: user_name })
        console.log(users)
        await User.findByIdAndDelete(users._id)
        return res.json({
            message: "User deleted Succesfully."
        })
    } catch (err) {
        return res.json({
            message: "No user found with the given name.",
            err
        })
    }

})

app.listen(PORT, async () => {
    console.log(`Server started at port ${PORT}`)
})