import bcrypt from 'bcryptjs'
import 'dotenv/config'
import mongoose from 'mongoose'
import validator from 'validator'
import {USER} from '../constants/index'

const {Schema} = mongoose;

const userSchema = new Schema({
    email:{
        type: String, 
        lowercase: true,
        required: true,
        validator: [validator.isEmail, 'Please provide a valid email']
    },
    username:{
        type: String
    }
})