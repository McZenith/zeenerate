export interface ILoginUserInput {
  email: string;
  password: string;
}

export interface ILoginUserInputError {
  email?: string;
  password?: string;
  general?: string;
}
