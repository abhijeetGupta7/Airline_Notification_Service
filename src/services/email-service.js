const { transporter } = require("../config");
const { TicketRepository } = require("../repositories");

class EmailService {
    #TicketRepository;
    constructor() {
        this.#TicketRepository=new TicketRepository();
    }

    async sendMail(mailFrom,mailTo,subject,message) {
        try {
        const response= await transporter.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: subject,
            text: message
        })
        console.log(response);
        return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async createTicket(data) {
        console.log(data);
        try {
            const response= await this.#TicketRepository.create(data);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getPendingEmails() {
        try {
            const response= await this.#TicketRepository.getPendingEmails();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports=EmailService;