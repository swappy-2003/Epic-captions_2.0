"use server"
import { User } from "../../../../models/user.model";

import {connect} from "@libs/mongodb";

export async function createUser(user){
    try{
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