const dotenv=require('dotenv');

dotenv.config();

module.exports={
    PORT:process.env.PORT || 3000,
    GMAIL_EMAIL:process.env.GMAIL_EMAIL,
    GMAIL_APP_PASS:process.env.GMAIL_APP_PASS
}