const Notification = require('../models/Notification');
const Shop = require('../models/Shop');

const createAppointmentNotification = async (payload, io) => {
  const { user_id, shop_id, text } = payload;

  const shop = await Shop.findById(shop_id);

  if (!shop) {
    console.log('No hay comercio con esa identificacion.');
  }

  const notification = new Notification({
    shop_id,
    text
  })

  await notification.save();

  delete notification._doc.__v;
  io.to(shop.socket_id).emit('create-appointment-notification', notification);
}

module.exports = createAppointmentNotification;
