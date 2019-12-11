import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  get Key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;

    await Mail.sendMail({
      to: `${appointment.doctor.name}  <${appointment.doctor.email}>`,
      subject: 'Consulta cancelada',
      template: 'cancellation',
      context: {
        doctor: appointment.doctor.name,
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "dd 'de' MMMM', às ' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancellationMail();
