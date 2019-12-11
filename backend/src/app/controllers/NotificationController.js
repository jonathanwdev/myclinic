import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    const checkIsDoctor = await User.findOne({
      where: { id: req.userId, doctor: true },
    });
    if (!checkIsDoctor) {
      return res.status(401).json({
        error: 'Somente administradores leem esse tipo de notificação',
      });
    }

    const notification = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(10);
    return res.json(notification);
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        read: true,
      },
      { new: true }
    );
    return res.json(notification);
  }
}
export default new NotificationController();
