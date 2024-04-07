require('dotenv').config();
const bcrypt = require('bcrypt');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const mongoose = require('mongoose');

const mongoDB = process.env.DATABASE_URL;
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const User = require('../models/user');
const { register } = require('../validators/user');

const { argv } = yargs(hideBin(process.argv)).option('username', {
  alias: 'u',
  describe: 'The admin username',
  type: 'string',
}).option('password', {
  alias: 'p',
  describe: 'The admin password',
  type: 'string',
});
const runningFromScript = require.main === module;

const createAdmin = async () => {
  try {
    let { username } = argv;
    let { password } = argv;
    const createAdminRequest = process.env.CREATE_ADMIN_INITIALLY === 'true';

    if (createAdminRequest && !runningFromScript) {
      username = process.env.ADMIN_USERNAME;
      password = process.env.ADMIN_PASSWORD;
    }

    const { error } = register.validate({ username, password });
    if (error) {
      console.error('Error creating admin:', error);
      return;
    }

    const user = await User.findOne({ username });
    if (user) {
      if (!runningFromScript) return;
      console.log('Admin already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role: 'admin' });
    await newUser.save();
    console.log('Admin created successfully');
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    if (runningFromScript) mongoose.disconnect();
  }
};

if (runningFromScript) {
  createAdmin();
}

module.exports = createAdmin;
