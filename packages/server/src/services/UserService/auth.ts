import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcryptjs';
import users from '../../models/users';
import Knex from 'knex';

interface User {
  id?: number;
  email: string,
  password: string
}

export const createTokens = async (user: User, secret: string, secret2: string) => {
  const createToken = jwt.sign(
    {
      user: _.pick(user, ['id']),
    },
    secret,
    {
      expiresIn: '1h',
    },
  );

  const createRefreshToken = jwt.sign(
    {
      user: _.pick(user, 'id'),
    },
    secret2,
    {
      expiresIn: '7d',
    },
  );

  return [createToken, createRefreshToken];
};

// export const refreshTokens = async (token: string, refreshToken, models, SECRET) => {
//   let userId = -1;
//   try {
//     const { user: { id } } = jwt.decode(refreshToken);
//     userId = id;
//   } catch (err) {
//     return {};
//   }

//   if (!userId) {
//     return {};
//   }

//   const user = await models.User.findOne({ where: { id: userId }, raw: true });

//   if (!user) {
//     return {};
//   }

//   try {
//     jwt.verify(refreshToken, user.refreshSecret);
//   } catch (err) {
//     return {};
//   }

//   const [newToken, newRefreshToken] = await createTokens(user, SECRET, user.refreshSecret);
//   return {
//     token: newToken,
//     refreshToken: newRefreshToken,
//     user,
//   };
// };

export const tryLogin = async (userData: User, SECRET: string, SECRET2: string, knex?: Knex) => {
  
  const user: any = await users.query(knex).where('email', userData.email);
  
  if (!user || user.length < 1) {
    return {
      ok: false,
      errors: [{path: 'email', message: 'Invalid username'}]
    }
  }

  console.log(user)
  const valid = await bcrypt.compare(userData.password, user[0].password);

  if (!valid) {
    return {
      ok: false,
      errors: [{path: 'password', message: 'Invalid password'}]
    }
  }

  const refreshTokenSecrete = `${user[0].password}${SECRET2}`;

  const [token, refreshToken] = await createTokens(user[0], SECRET, refreshTokenSecrete);

  return {
    ok: true,
    token,
    refreshToken,
  };
};