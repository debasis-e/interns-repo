function validatePhoneNumber(phoneNumber) { //issue here take example and check
    const pattern = /^\d{3}-\d{3}-\d{4}$/;
    return pattern.test(phoneNumber);
}
function validateEmail(email) {
    const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return pattern.test(email);
}


exports.validateEmail=validateEmail;
exports.validatePhoneNumber=validatePhoneNumber;