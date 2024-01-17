import bcrypt from 'bcrypt';
import express from 'express';
// import jwt from 'jsonwebtoken';
import { pool } from '../../db.js';
import { createTokens } from '../../utils/utils.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { password, username } = req.body;
    const checkForUser = await pool.query('SELECT * FROM users WHERE user_name = $1', [username]);

    /**
     * @typedef {Object} AuthenticatedUser
     * @property {number} user_id
     * @property {string} user_name
     * @property {string} user_pw
     * @property {Date} created_at
     * @property {Date} updated_at
     */

    /** @type {AuthenticatedUser | undefined } */
    const authenticatedUser = checkForUser && checkForUser.rows && checkForUser.rows.length && checkForUser.rows[0];
    
    const isValidPassword = await bcrypt.compare(password, authenticatedUser.user_pw);

    if (!authenticatedUser || !isValidPassword) {
      return res.status(401).json({ isError: true, message: "Bad credentials" });
    }

    const tokens = createTokens({
      userId: authenticatedUser.user_id,
      username: authenticatedUser.user_name
    });

    res.cookie("refresh", tokens.refreshToken, {
      // ...(process.env.COOKIE_DOMAIN && { domain: process.env.COOKIE_DOMAIN }),
      httpOnly: true,
      // sameSite: "none",
      // secure: true
    });

    res.cookie("access", tokens.accessToken, {
      // ...(process.env.COOKIE_DOMAIN && { domain: process.env.COOKIE_DOMAIN }),
      httpOnly: true,
      // sameSite: "none",
      // secure: true
    });

    res.json({ isError: false, tokens});

  } catch (error) {
    res.status(401).json({ error: error.message, isError: true});
  }
});

router.delete("/logout", (req, res) => {
  try {
    res.clearCookie("refresh");
    res.clearCookie("access");
    return res.status(200).json({ isLoggedOut: true });
  } catch (error) {
    res.status(401).json({ isError: true, message: error.message });
  }


});

export default router;
