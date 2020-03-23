const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');

//중복 이메일 체크
router.post('/emailCheck', async (req, res, next) => {
    try {
        //db에서 찾기
        const oldUser = await db.User.findOne({
            where : {
                email : req.body.email
            }
        });
        if(oldUser) {
            return res.status(200).json({ result : true });
        } else {
            return res.status(200).json({ result : false });
        }
    } catch(e) {
        console.error(e);
        next(e);
    }
});

//회원 가입
router.post('/signUp', async (req, res, next) => {
    try {
        //비밀번호 암호화 처리
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = await db.User.create({
            email : req.body.email,
            password : hashedPassword,
            nickname : req.body.nickname
        });
        return res.status(200).json(newUser);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

//로그인
router.post('/login', (req, res, next) => { //api/user/login
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            console.error(e);
            return next(e);
        }
        if(info) {
            return res.status(401).send(info.reason);
        }
        return req.login(user, async(loginErr) => {
            try {
                if(loginErr) {
                    return next(loginErr);
                }
                const loginedUser = await db.User.findOne({
                    where : { id : user.id },
                    attributes : ['id', 'email', 'nickname'],
                });
                return res.json(loginedUser);
            } catch(e) {
                next(e);
            }
        });
    }) (req, res, next);
})

module.exports = router;