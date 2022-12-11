const Flight = require('../models/ticketModel');

exports.getAllFlights = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    const query = Flight.find(JSON.parse(queryStr));
    const tickets = await query; // Burada await yapmasam paginate vessaire ekleyemezdim

    res.status(200).json({
      status: 'Success',
      results: tickets.length,
      data: tickets,
    });
  } catch (err) {
    res.status(400).json({
      status: 'Error',
      message: err,
    });
  }
};
