import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Task from "./models/Task.js";

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    await User.deleteMany();
    await Task.deleteMany();

    const user = await User.create({
      name: "Demo User",
      email: "demo@taskmanager.com",
      password: "demo123",
    });

    await Task.create([
      {
        title: "Set up project repository",
        description: "Initialize Git repo and push starter code",
        status: "done",
        priority: "high",
        user: user._id,
      },
      {
        title: "Design database schema",
        description: "Plan User and Task collections",
        status: "in-progress",
        priority: "medium",
        user: user._id,
      },
      {
        title: "Build authentication flow",
        description: "JWT login and signup",
        status: "todo",
        priority: "high",
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        user: user._id,
      },
    ]);

    console.log("Seed data inserted successfully");
    console.log("Login: demo@taskmanager.com / demo123");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
