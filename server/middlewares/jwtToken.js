import dotenv from 'dotenv'
dotenv.config();

export const sendToken = (user, statusCode, res) => {
  const token = user.getJWT();
  const isProduction=process.env.NODE_ENV==="production";

  console.log("################### IN SENDTOKEN PRODUCTION : ",isProduction);
  
    const options = {
      expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
      httpOnly: true,
      secure: isProduction,         // required for SameSite=None
      sameSite: isProduction ? "none" : "lax",  // 🔑 change here
      path: "/",                    // ensure it’s global
    };


  console.log("Token created:", token); // Debug log
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
  });
};
