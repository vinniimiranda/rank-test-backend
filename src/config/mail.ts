export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT || 2525,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'Ebay alerts <noreply@ebayalerts.com',
  },
};
