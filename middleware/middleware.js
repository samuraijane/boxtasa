import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
  next();
  // const { cookies } = req;

  // const isNoCookies = Object.keys(cookies).length < 1;

  // if (isNoCookies) {
  //   req.isAuth = false;
    
  //   res.json({
  //     isAuth: false,
  //     isError: true,
  //     message: "Cookies are missing."
  //   });
    
  // } else {
  //   const { access, refresh } = cookies;

  //   if (!access) {
  //     req.isAuth = false;
  //     return res.sendStatus(401);
  //   }
  
  //   jwt.verify(access, process.env.ACCESS_SECRET, (err, user) => {
  //     if (err) {
  //       req.isAuth = false;
  //       return res.sendStatus(403);
  //     }
  //     req.isAuth = true;
  //     req.user = user;
  
  //     next();
  //   });
  // }
};
