export default class RegistrationForm {
  constructor(firstName, lastName, email, password, confirmPassword) {
    this.setFirstName(firstName);
    this.setLastName(lastName);
    this.setEmail(email);
    this.setPassword(password);
    this.setConfirmPassword(confirmPassword);
  }

  setFirstName(value) {
    if (typeof value !== "string" || !value.trim()) {
      throw new Error("First Name cannot be empty");
    }

    const hasLetters = /[a-zA-Z]/.test(value);
    if (!hasLetters) {
      throw new Error("First Name must contain letters");
    }

    this.firstName = value.trim();
  }

  setLastName(value) {
    if (typeof value !== "string" || !value.trim()) {
      throw new Error("Last Name cannot be empty");
    }

    this.lastName = value.trim();
  }

  setEmail(value) {
    if (!value || typeof value !== "string") {
      throw new Error("Email is missing");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof value !== "string" || !emailRegex.test(value)) {
      throw new Error("Invalid Email format");
    }

    this.email = value;
  }

  setPassword(value) {
    if (typeof value !== "string" || value.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }

    const digitsOnly = /^\d+$/.test(value);
    if (digitsOnly) {
      throw new Error("Password cannot contain digits only");
    }

    this.password = value;
  }

  setConfirmPassword(value) {
    if (value !== this.password) {
      throw new Error("Passwords do not match");
    }

    this.confirmPassword = value;
  }

  isReadyToRegister() {
    return (
      this.firstName &&
      this.lastName &&
      this.email &&
      this.password &&
      this.confirmPassword === this.password
    );
  }
}
