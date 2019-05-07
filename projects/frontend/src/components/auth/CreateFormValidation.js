export default function validate(values) {
    const errors = {};
    
    if (!values.firstName) {
        errors.firstName = 'First name is required';
    }

    if (!values.lastName) {
        errors.lastName = 'Last name is required';
    }

    if (!values.email) {
        errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }

    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 8) {
        errors.password = 'Password must be 8 or more characters';
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Repeat the password';
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Password mismatch';
    }
    
    return errors;
};