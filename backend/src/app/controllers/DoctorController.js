import * as Yup from 'yup';
import User from '../models/User';

class DoctorController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      address: Yup.string(),
      profession: Yup.string().required(),
      password: Yup.string()
        .required()
        .min(6),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref('password')]),
    });
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro na validação, confira todos os campos' });
    }

    const user = await User.findByPk(req.userId);
    if (!user.doctor) {
      return res
        .status(401)
        .json({ error: 'Somente administradores podem criar novos Adms' });
    }
    const { name, email, doctor, profession, address } = req.body;

    const { id } = await User.create({
      name,
      email,
      address,
      profession,
      doctor: true,
    });

    return res.json({ id, name, email, address, doctor, profession });
  }
}

export default new DoctorController();
