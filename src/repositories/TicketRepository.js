const { Ticket } = require("../models");
const { ENUMS } = require("../utils/common");
const CrudRepository = require("./crud-repository");

class TicketRepository extends CrudRepository {
    constructor() {
        super(Ticket);
    }

    async getPendingEmails() {
        const response=await Ticket.findAll(
        {
            where: {
                status: ENUMS.NOTIFICATION_STATUS.PENDING
            }
        })
        return response;
    }
}

module.exports=TicketRepository;