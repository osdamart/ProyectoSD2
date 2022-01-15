import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const KEY = 'asdjslkdjk1m'

export default function login(req:NextApiRequest, res:NextApiResponse) {
    if(!req.body){
        res.statusCode=404
        res.end('ERRROR')
        return
    }

    const {username, password} = req.body

    res.json({
        token:jwt.sign(
            {
                username,
                admin: username==='admin' && password==='admin'
            },
            KEY
        )
    })
}