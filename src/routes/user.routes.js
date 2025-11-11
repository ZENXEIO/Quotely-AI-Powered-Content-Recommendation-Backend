import { json, Router } from "express";

const router = Router()

router.route('/registered').get((req, res)=>{
    res.send('Welcome to backend');
})

router.route('/registered').post(async (req,res)=>{
    const val = await req.body;

    res.json('Hello')
})

export default router