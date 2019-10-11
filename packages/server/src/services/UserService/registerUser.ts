import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import users from '../../models/users';
import Knex from 'knex';

interface User {
  email: string,
  password: string
}

const registerUser = async(user: User, knex?: Knex) => {

  const findUser = await users.query(knex).where('email', user.email);

  if (findUser.length > 0) {
    throw new Error('User already exists');
  }
  user.password = await bcrypt.hash(user.password, 12);
  const userData = await users.query(knex).insertGraph(user);
  return userData;
}

export default registerUser;