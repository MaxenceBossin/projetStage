module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    // initialize objet errors, to throw error in
    const errors = {}
    if(username.trim()===''){
        errors.username = 'user name must not be empty'
    }
    if(email.trim()===''){
        errors.email = 'email must not be empty'        
    }else {
        // verify reglar's mail expression
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
        if (!email.match(regEx)) {
            errors.email = 'Email must be a valid email address';
        }
    }
    if(password.trim()===''){
        errors.password = 'password must not empty'
    }else{
        if(password !== confirmPassword){
            errors.confirmPassword = 'Passwords must match !'
        }
    }
    return {
        errors,
        valid: Object.keys(errors).lenght < 1
    }
}
// connection

module.exports.validateLoginInput = (username, password) => 
{
    const errors = {}
    if(username.trim()===''){
        errors.username = 'user name must not be empty'
    }
    if(password.trim()===''){
        errors.password = 'password must not empty'
    }
    return {
        errors,
        valid: Object.keys(errors).lenght < 1
    }
}