import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
  subHours,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';

class AvailableController {
  async index(req, res) {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ error: 'Data invalida' });
    }
    const searchDate = Number(date);

    const appointment = await Appointment.findAll({
      where: {
        doctor_id: req.params.id,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });
    const schedule = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
    ];
    const available = schedule.map(time => {
      const [hour, minute] = time.split(':');

      const value = setSeconds(
        setMinutes(setHours(searchDate, hour), minute),
        0
      );
      return {
        time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        available:
          isAfter(value, subHours(new Date(), 1)) &&
          !appointment.find(
            a => format(a.date, 'HH:mm', { locale: pt }) === time
          ),
      };
    });

    return res.json(available);
  }
}

export default new AvailableController();
