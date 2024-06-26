// * IMPORTS
const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailer-config");

// * FUNCTIONS
// Send email
const sendEmail = async ({
  from = "officiallocallancer@gmail.com",
  to,
  subject,
  html,
}) => {
  await nodemailer.createTestAccount(); // Create a test account

  const transporter = nodemailer.createTransport(nodemailerConfig); // Create a transporter

  // Send the email
  return transporter.sendMail({
    from,
    to,
    subject,
    html,
  });
};

// Send verification email
const sendVerificationEmail = async ({
  username,
  email,
  verificationToken,
}) => {
  const url = `http://localhost:4200`;
  const verifyLink = `${url}/verify?token=${verificationToken}&email=${email}`; // Create the verification link

  // Create the message
  const message = `<h2>Welcome to Local Lancer</h2><p>Thanks for creating an account ${username}. click <a href="${verifyLink}" target="_blank">here</a> to verify your email</p>`;

  // Send the email
  return sendEmail({ to: email, subject: "Email Confirmation", html: message });
};

// Send reset password email
const sendResetPasswordEmail = async ({ name, email, url, resetToken }) => {
  const resetLink = `${url}/resetPassword?email=${email}&token=${resetToken}`; // Create the reset link

  // Create the message
  const message = `<h2>Reset Password</h2><p>${name}, Please click on the following link to reset your password.</p><br /><p><a href="${resetLink}" target="_blank">Reset Password</a> to verify your email</p>`;

  // Send the email
  return sendEmail({ to: email, subject: "Password Reset", html: message });
};

// * EXPORTS
module.exports = { sendEmail, sendVerificationEmail, sendResetPasswordEmail };
