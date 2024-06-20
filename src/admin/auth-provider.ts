import bcrypt from 'bcrypt';
import { DefaultAuthProvider } from 'adminjs';

import { User } from '../db/entity/user.entity.js';

import { componentLoader } from './component-loader.js';

const provider = new DefaultAuthProvider({
  componentLoader,
  authenticate: async ({ email, password }) => {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return { email: user.email };
    }

    return null;
  },
});

export default provider;
