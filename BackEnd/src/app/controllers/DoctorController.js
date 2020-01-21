import * as Yup from 'yup';
import { Op } from 'sequelize';
import User from '../models/User';
import File from '../models/File';

class DoctorController {
  async index(req, res) {
    const doctor = await User.findAll({
      where: { doctor: true, id: { [Op.ne]: req.userId } },
      attributes: [
        'id',
        'name',
        'email',
        'doctor',
        'avatar_id',
        'address',
        'profession',
      ],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'url', 'name', 'path'],
        },
      ],
    });

    return res.json(doctor);
  }

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
        .json({ error: 'Somente administradores podem criar novos Doutores' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res
        .status(400)
        .json({ error: 'Email já cadastrado por outro usuario' });
    }

    const { id, name, email, doctor, profession, address } = await User.create({
      ...req.body,
      doctor: true,
    });

    return res.json({ id, name, email, address, doctor, profession });
  }

  async delete(req, res) {
    const doctor = await User.findOne({ where: { id: req.params.id } });
    if (!doctor) {
      return res.status(404).json({ error: 'Este adm não existe no time' });
    }
    const user = await User.findByPk(req.userId);
    if (user.doctor === false) {
      return res
        .status(401)
        .json({ error: 'Somente administradores podem remover adms' });
    }
    await doctor.destroy();
    return res.send();
  }
}

export default new DoctorController();
