
/**
 * @description:generate otp
 */
function generateOtp(length, isNumeric = false) {
  let otp = "";
  const characters=isNumeric? '0123456789':'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < length; i++) {
    otp += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return otp;
}