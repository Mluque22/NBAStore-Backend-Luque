// controllers/ticketController.js
import TicketModel from "../dao/models/ticket.js";

export const getTickets = async (req, res) => {
    try {
        const tickets = await TicketModel.find().lean();
        res.json({ status: "success", payload: tickets });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};
