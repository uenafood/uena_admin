import bcry from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await bcry.hash(password, saltRounds);
  return hashedPassword;
};
