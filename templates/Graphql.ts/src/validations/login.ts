import * as bcrypt from 'bcryptjs';
import { UserInputError } from 'apollo-server-express';
import { ILoginUserInput, ILoginUserInputError } from '../interface';
import { User } from '../models';
export const validateLoginInput = async ({
  email,
  password,
}: ILoginUserInput) => {
  const errors: ILoginUserInputError = {};
  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }
  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  }
  const user = await User.findOne({ email });

  if (!user) {
    errors.general = 'User not found';
    throw new UserInputError('User not found', { errors });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    errors.general = 'Wrong crendetials';
    throw new UserInputError('Wrong crendetials', { errors });
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
    user,
  };
};
