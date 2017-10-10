require('dotenv').config();
const Pusher = require('pusher');

const { PUSHER_APP_ID, PUSHER_KEY, PUSHER_SECRET, TIME } = process.env;

const pusher = new Pusher({
  appId: PUSHER_APP_ID,
  key: PUSHER_KEY,
  secret: PUSHER_SECRET,
  cluster: 'eu',
  encrypted: true
});

let multiplier = 1;
const interval = setInterval(() => {
  const messages = {
    1: "Order Received",
    2: "Order Placed",
    3: "In the Oven",
    4: "Out for Delivery",
    5: "Delivered"
  }
  multiplier = multiplier + 1;
  const messageId = multiplier-1;

  if (multiplier > 5) {
    console.log('clearing');
    clearInterval(interval);
  }
  
  pusher.trigger('food', 'status', {
    message: messages[messageId],
    progress: messageId/5
  });
}, multiplier * TIME);
