import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';


export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

UserSchema.pre('save', async function(next: (err?: Error) => void) {
	try {
		if (!this.isModified('password')) {
			return next();
		}

		this['password'] = await bcrypt.hash(this['password']);
  } catch (err) {
		return next(err);
	}
});
