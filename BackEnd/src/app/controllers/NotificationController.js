import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    const checkUser = await User.findOne({
      where: { id: req.userId },
    });
    if (!checkUser) {
      return res.status(401).json({
        error: 'Somente usuarios credenciados tem acesso a notificações',
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
