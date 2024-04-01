type ValidationResult = {
  isValid: boolean;
  errors: {
    email?: string;
    password?: string;
  };
};

export const validateSignupForm = (email: string, password: string): ValidationResult => {
  const errors: ValidationResult['errors'] = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordHasNumber = /\d/;
  const passwordMinLength = 8;

  if (!emailRegex.test(email)) {
    errors.email = 'Invalid email format';
  }

  if (password.length < passwordMinLength) {
    errors.password = `Password must be at least ${passwordMinLength} characters long`;
  } else if (!passwordHasNumber.test(password)) {
    errors.password = 'Password must contain at least one number';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
