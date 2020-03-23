exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    } else {
        console.log('로그인 안된 상태!');
        res.status(401).send('로그인이 필요합니다.');
    }
};