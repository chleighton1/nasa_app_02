import express, { Request, Response, Router } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

router.use(express.json());
router.use(cors());

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error: Error) => console.error(error));

import "../userDetails";

const User = mongoose.model("UserInfo");

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { fname, lname, email, password } = req.body;
  
    const encryptedpassword = await bcrypt.hash(password, 10);
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.send({ error: "User already exists with that email" });
    }

    await User.create({
      fname: fname,
      lname: lname,
      email: email,
      password: encryptedpassword,
    });

    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: error });
  }
});

router.post("/signin", async (req: Request, res: Response) => {
  try{
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User does not exist" });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string, {
        expiresIn: 600,
      });

      return res.status(201).json({ status: "ok", data: token })
    }

    res.json({ status: "error", error: "Invalid Password" });
  } catch (error: any) {
    res.status(500).json({ status: "error", error: error.message});
  }  
});

router.post("/home", async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const user = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof user === 'string' && user === 'session expired') {
      return res.status(401).json({status: "error", data: "session expired"});
    }

    const user_email = (user as {email: string}).email;
    const userData = await User.findOne({ email: user_email});

    if (userData) {
      res.status(200).json({ status: "ok", data: userData });
    } else {
      res.status(404).json({ status: "error", error: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

export default router;

