import { IUserInput, IUserInputError } from '../interface';
import { User } from '../models';
export const validateRegisterInput = async ({
  email,
  password,
  confirmPassword,
}: IUserInput) => {
  let errors: IUserInputError = {};

  // if (username.trim() === '') {
  //   errors.username = 'Username must not be empty';
  // }
  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }
  //TODO: Make sure user doesnt already exist
  const tempuser = await User.findOne({ email });
  if (tempuser) errors.email = 'email already exist';
  if (password === '') {
    errors.password = 'Password must not empty';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
