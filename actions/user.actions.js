"use server"
import User from "../modals/user.modal.js";
import { connect } from "../src/libs/mongodb.js";

export async function createUser(user) {
    try {
        await connect();
        const newUser = new User(user);
        // Save the new user to the database
        const savedUser = await newUser.save();
        return JSON.parse(JSON.stringify(savedUser));
    }
    catch(err){
        console.error(err);
        return err;
    }
}