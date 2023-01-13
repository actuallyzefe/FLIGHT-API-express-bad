const Stripe = require('stripe');
const Flight = require('./../models/ticketModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

// CHECKOUT
exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // Get current flight
  const flight = await Flight.findById(req.params.id);
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

  // 2) create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/accepted`,
    cancel_url: `${req.protocol}://${req.get('host')}/cancelled`,
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: flight.price * 100,
          product_data: {
            name: `${flight.name}`,
            description: flight.airline,
          },
        },
      },
    ],
    mode: 'payment',
  });

  // Response
  res.status(200).json({
    status: 'success',
    session,
  });
});
