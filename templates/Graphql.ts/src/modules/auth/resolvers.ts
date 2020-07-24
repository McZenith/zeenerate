import * as bcrypt from 'bcryptjs';
import { UserInputError } from 'apollo-server-express';
import { User } from '../../models';
import {
  MutationRegisterArgs,
  ResolversParentTypes,
  MutationLoginArgs,
  MutationRevokeRefreshTokensForUserArgs,
  MutationLogoutArgs,
} from '../../types/graphql';
import { validateRegisterInput, validateLoginInput } from '../../validations';
import { sendVerificationEmail } from '../../email';
import { IResContext } from '../../interface';
import {
  createRefreshToken,
  sendRefreshToken,
  createAccessToken,
} from '../../utils';

export const resolvers = {
  Query: {
    me: () => {
      return User.findById('5f1981a84c7b0a339269d983');
    },
  },
  Mutation: {
    register: async (
      _: ResolversParentTypes,
      { email, password, confirmPassword }: MutationRegisterArgs
    ) => {
      const { valid, errors } = await validateRegisterInput({
        email,
        password,
        confirmPassword,
      });

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        email,
        password: hashedPassword,
      });

      await user.save();
      const result = await sendVerificationEmail(user);
      return result;
    },
    login: async (
      _: ResolversParentTypes,
      { email, password }: MutationLoginArgs,
      { res }: IResContext
    ) => {
      const { errors, valid, user } = await validateLoginInput({
        email,
        password,
      });

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      // login successful
      const rToken = createRefreshToken(user);

      sendRefreshToken(res, rToken);
      const aToken = createAccessToken(user);
      return {
        accessToken: aToken,
        user,
      };
    },
    logout: async (
      _: ResolversParentTypes,
      { logout }: MutationLogoutArgs,
      { res }: IResContext
    ) => {
      sendRefreshToken(res, '');

      if (logout) return true;
      return false;
    },
    revokeRefreshTokensForUser: async (
      _: ResolversParentTypes,
      { userId }: MutationRevokeRefreshTokensForUserArgs
    ) => {
      await User.findOneAndUpdate(
        { _id: userId },
        { $inc: { tokenVersion: 1 } },
        { new: true }
      );
      return true;
    },
  },
};
