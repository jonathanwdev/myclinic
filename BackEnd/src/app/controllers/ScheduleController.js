import {
  startOfDay,
  endOfDay,
  parseISO,
  subHours,
  isBefore,
  format,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Op } from 'sequelize';
import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';
import Notification from '../schemas/Notification';

class ScheduleController {
  async index(req, res) {
    const checkProvider = await User.findOne({
      where: { id: req.userId, doctor: true },
    });
    if (!checkProvider) {
      return res
        .status(401)
        .json({ error: 'Somente doutores podem acessar a agenda' });
    }
    const { date } = req.query;
    const parsedDate = parseISO(date);

    const appointments = await Appointment.findAll({
      where: {
        doctor_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
      order: ['date'],
    });

    return res.json(appointments);
  }

  async delete(req, res) {
    const user = await User.findByPk(req.userId);
    const appointments = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'doctor',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!user.doctor) {
      return res.status(401).json({
        error: 'Você não tem permissão para executar esta função',
      });
    }
    if (appointments.doctor_id !== req.userId) {
      return res.status(401).json({
        error: 'Você não pode excluir agendamentos de outros doutores',
      });
    }
    const dateWithSub = subHours(appointments.date, 2);
    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({
        error: 'Você só pode cancelar agendamentos 2 horas antes do mesmo',
      });
    }
    if (appointments.canceled_at) {
      return res.status(404).json({ error: 'Este agendamento não existe' });
    }

    appointments.canceled_at = new Date();
    await appointments.save();

    /** Notify User */

    const formattedDate = format(
      appointments.date,
      "dd 'de' MMMM' às ' H:mm'h'",
      {
        locale: pt,
      }
    );

    const notification = await Notification.create({
      content: `Seu agendamento com o(a) Dr(a) ${appointments.doctor.name}, para o dia ${formattedDate}, foi cancelado`,
      user: appointments.user_id,
    });

    const ownerSocket = req.connectedUsers[appointments.user_id];

    if (ownerSocket) {
      req.io.to(ownerSocket).emit('notification', notification);
    }

    return res.json(appointments);
  }
}

export default new ScheduleController();
