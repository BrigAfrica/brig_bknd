import * as argon from 'argon2';
import passport from 'passport';
import LocalStrategy from 'passport-local'
import { prisma } from './db';

passport.use('login', new LocalStrategy.Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email
      }
    })
    if (!user || !user.password) {
      return done(null, false, { message: 'Invalid username/password.' });
    }
    const validPassword = await argon.verify(user.password, password)
    if (!validPassword) {
      return done(null, false, { message: 'Invalid username/password.' });
    }
    return done(null, user);
  } catch (err) {
    console.error(err);
    return done(err);
  }
}))