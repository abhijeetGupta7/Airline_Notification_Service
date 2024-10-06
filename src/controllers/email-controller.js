const { StatusCodes } = require("http-status-codes");
const { EmailService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

const emailService=new EmailService();

async function createTicket(req,res) {
    try {
        const response=await emailService.createTicket({
            subject: req.body.subject,
            content: req.body.content,
            recepientEmail: req.body.recepientEmail
        });
        SuccessResponse.message="Successfully created the Ticket";
        SuccessResponse.data=response;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.message="Something went wrong while creating the Ticket";
        ErrorResponse.error=error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getPendingEmails(req,res) {
    try {
        const response=await emailService.getPendingEmails();
        SuccessResponse.message="Successfully fetched all the Pending Emails";
        SuccessResponse.data=response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message="Something went wrong while fetching the pending Emails";
        ErrorResponse.error=error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function sendMail(req,res) {
    try {
        const response=await emailService.sendMail();
        SuccessResponse.message="Successfully fetched all the Pending Emails";
        SuccessResponse.data=response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message="Something went wrong while fetching the pending Emails";
        ErrorResponse.error=error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

module.exports={
    createTicket,
    getPendingEmails,
    sendMail
}