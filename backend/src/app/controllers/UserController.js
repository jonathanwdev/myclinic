import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res
        .status(400)
        .json({ error: 'Email já cadastrado por outro usuario' });
    }
    const { name, email, password_hash, doctor } = await User.create(req.body);
    return res.json({ name, email, password_hash, doctor });
  }
}

export default new UserController();
