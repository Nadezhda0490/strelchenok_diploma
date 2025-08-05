import assert from "assert";
import RegistrationForm from "../registration-form/registration.js";

let registrationForm;

beforeEach(() => {
  registrationForm = new RegistrationForm(
    "Nadja",
    "Smith",
    "user@example.com",
    "Password1!",
    "Password1!"
  );
});

afterEach(() => {
  registrationForm = null;
});

describe("Registration - Negative Tests", () => {
  describe("First Name", () => {
    it("should throw error with empty first name", () => {
      assert.throws(() => {
        registrationForm.setFirstName("");
      }, /First Name cannot be empty/);
    });

    it("should throw error when first name contains only numbers", () => {
      assert.throws(() => {
        registrationForm.setFirstName("1234");
      }, /First Name must contain letters/);
    });

    it("should throw error if first name contains only spaces", () => {
      assert.throws(() => {
        registrationForm.setFirstName("   ");
      }, /First Name cannot be empty/);
    });
  });

  describe("Last Name", () => {
    it("should throw error if last name is an empty string", () => {
      assert.throws(() => {
        registrationForm.setLastName("");
      }, /Last Name cannot be empty/);
    });

    it("should throw error if last name is not a string", () => {
      assert.throws(() => {
        registrationForm.setLastName(true);
      }, /Last Name cannot be empty/);
    });
  });

  describe("Email", () => {
    it("should throw error if email does not contain @", () => {
      assert.throws(() => {
        registrationForm.setEmail("user.example.com");
      }, /Invalid Email format/);
    });

    it("should throw error if email is missing domain", () => {
      assert.throws(() => {
        registrationForm.setEmail("user@");
      }, /Invalid Email format/);
    });

    it("should throw error if email is missing top-level domain", () => {
      assert.throws(() => {
        registrationForm.setEmail("user@example");
      }, /Invalid Email format/);
    });

    it("should throw error if email contains spaces", () => {
      assert.throws(() => {
        registrationForm.setEmail("user @example.com");
      }, /Invalid Email format/);
    });

    it("should throw error if email is missing", () => {
      assert.throws(() => {
        registrationForm.setEmail("");
      }, /Email is missing/);
    });
  });

  describe("Password", () => {
    it("should throw error if password is shorter than 6 characters", () => {
      assert.throws(() => {
        registrationForm.setPassword("123ab");
      }, /Password must be at least 6 characters long/);
    });

    it("should throw error if password is empty", () => {
      assert.throws(() => {
        registrationForm.setPassword("");
      }, /Password must be at least 6 characters long/);
    });

    it("should throw error if password contains digits only", () => {
      assert.throws(() => {
        registrationForm.setPassword("1234567");
      }, /Password cannot contain digits only/);
    });
  });

  describe("Confirm Password", () => {
    it("should throw error if confirm password does not match password", () => {
      registrationForm.setPassword("QWERTY123");
      assert.throws(() => {
        registrationForm.setConfirmPassword("123QWERy");
      }, /Passwords do not match/);
    });

    it("should throw error if confirm password is empty", () => {
      registrationForm.setPassword("password1");
      assert.throws(() => {
        registrationForm.setConfirmPassword("");
      }, /Passwords do not match/);
    });
  });
});
