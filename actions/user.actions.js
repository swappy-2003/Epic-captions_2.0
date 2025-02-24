"use server"
import { User } from "../../../../models/user.model";
import { Webhook } from "svix";
import {connect} from "@mongodb";

export async function createUser(user){
    try{
        await connect();
        const newUser = new User(user);
        return JSON.parse(JSON.stringify( newUser));
        
        ;}
    catch(err){
        console.error(err);
        return err;
    }

}