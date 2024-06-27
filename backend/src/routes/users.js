const router = require("express").Router();
const { User, validate } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        console.log("Received signup request:", JSON.stringify(req.body, null, 2));

        const { error } = validate(req.body);
        if (error) {
            console.log("Validation error:", JSON.stringify(error.details, null, 2));
            return res.status(400).send({ message: error.details[0].message });
        }

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            console.log("User already exists:", req.body.email);
            return res
                .status(409)
                .send({ message: "User with given email already Exist!" });
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        user = new User({ ...req.body, password: hashPassword });
        console.log("User object before save:", JSON.stringify(user, null, 2));
        await user.save();

        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);

        res
            .status(201)
            .send({ message: "An Email sent to your account please verify" });
    } catch (error) {
        console.log("Full error:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.get("/:id/verify/:token/", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send({ message: "Invalid link" });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send({ message: "Invalid link" });

        await User.updateOne({ _id: user._id }, { verified: true });
        await token.remove();

        res.status(200).send({ message: "Email verified successfully" });
    } catch (error) {
        console.log("Verification error:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;