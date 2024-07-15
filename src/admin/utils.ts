import bcry from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await bcry.hash(password, saltRounds);
  return hashedPassword;
};

export const numToDay = (num: string): string => {
  // convert string to number
  const parsed = parseInt(num, 10);
  switch (parsed) {
    case 0:
      return 'Minggu';
    case 1:
      return 'Senin';
    case 2:
      return 'Selasa';
    case 3:
      return 'Rabu';
    case 4:
      return 'Kamis';
    case 5:
      return 'Jumat';
    case 6:
      return 'Sabtu';
    default:
      return 'Invalid day';
  }
};

export const dayToNum = (day: string): number => {
  switch (day) {
    case 'Minggu':
      return 0;
    case 'Senin':
      return 1;
    case 'Selasa':
      return 2;
    case 'Rabu':
      return 3;
    case 'Kamis':
      return 4;
    case 'Jumat':
      return 5;
    case 'Sabtu':
      return 6;
    default:
      return -1;
  }
};
