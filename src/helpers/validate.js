import { isEmail, isEmpty, isLength } from 'validator';
import {
    REQUIRED,
    INVALID,
    LENGTH_REQUIRED,
    PASSWORD_LENGTH,
    PHONE_LENGTH,
    ONLY_NUMBER_CHARACTER,
} from '../constants/form.constants';

const validate = (name, value) => {
    switch (name) {
    case 'firstName':
        if (isEmpty(value)) {
            return REQUIRED('First Name');
        }
        return '';
    case 'lastName':
        if (isEmpty(value)) {
            return REQUIRED('Last Name');
        }
        return '';
    case 'gender':
        if (isEmpty(value)) {
            return REQUIRED('Gender');
        }
        return '';
    case 'storeId':
        if (isEmpty(value)) {
            return REQUIRED('storeId');
        }
        return '';
    case 'phone':
        if (isEmpty(value)) {
            return REQUIRED('Phone Number');
        }
        if (!/\d/.test(value)) {
            return ONLY_NUMBER_CHARACTER;
        }
        if (/^(?=.*[A-Z]).*$/.test(value)) {
            return ONLY_NUMBER_CHARACTER;
        }
        if (/^(?=.*[!(@#)|$%`^&?*+=.;:_-]).*$/.test(value)) {
            return ONLY_NUMBER_CHARACTER;
        }
        if (/^(?=.*[a-z]).*$/.test(value)) {
            return ONLY_NUMBER_CHARACTER;
        }
        if (!isLength(value, PHONE_LENGTH, PHONE_LENGTH)) {
            return LENGTH_REQUIRED('Phone Number', { min: PHONE_LENGTH, max: PHONE_LENGTH });
        }
        return '';
    case 'email':
        if (isEmpty(value)) {
            return REQUIRED('Email');
        }
        if (!isEmail(value)) {
            return INVALID('Email');
        }
        return '';
    case 'pin':
        if (isEmpty(value)) {
            return REQUIRED('Password');
        }
        if (!/\d/.test(value)) {
            return ONLY_NUMBER_CHARACTER;
        }
        if (!isLength(value, PASSWORD_LENGTH, PASSWORD_LENGTH)) {
            return LENGTH_REQUIRED('Password', { min: PASSWORD_LENGTH, max: PASSWORD_LENGTH });
        }
        return '';
    default:
        return '';
    }
};

export default validate;
