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

describe("Registration - Positive Tests", () => {
  describe("First Name, Last Name", () => {
    it("should accept valid first name", () => {
      assert.strictEqual(registrationForm.firstName, "Nadja");
    });

    it("should accept valid last name", () => {
      assert.strictEqual(registrationForm.lastName, "Smith");
    });

    it("should accept first and last names with spaces around", () => {
      registrationForm.setFirstName(" Nadja ");
      registrationForm.setLastName(" Smith ");
      assert.strictEqual(registrationForm.firstName, "Nadja");
      assert.strictEqual(registrationForm.lastName, "Smith");
    });

    it("should accept lowercase valid first and last names", () => {
      registrationForm.setFirstName("nadja");
      registrationForm.setLastName("smith");
      assert.strictEqual(registrationForm.firstName, "nadja");
      assert.strictEqual(registrationForm.lastName, "smith");
    });
  });

  describe("Email", () => {
    it("should accept standard email format", () => {
      assert.strictEqual(registrationForm.email, "user@example.com");
    });

    it("should accept valid email with dots and dashes", () => {
      registrationForm.setEmail("nadja.smith-test@mail.co.uk");
      assert.strictEqual(registrationForm.email, "nadja.smith-test@mail.co.uk");
    });

    it("should accept email with numbers", () => {
      registrationForm.setEmail("nadja1234@test.com");
      assert.strictEqual(registrationForm.email, "nadja1234@test.com");
    });

    it("should accept email with subdomain", () => {
      registrationForm.setEmail("nadja@mail.qa.department.com");
      assert.strictEqual(
        registrationForm.email,
        "nadja@mail.qa.department.com"
      );
    });
  });

  describe("Pasword", () => {
    it("should accept valid password", () => {
      assert.strictEqual(registrationForm.password, "Password1!");
    });

    it("should accept password exactly 6 characters long", () => {
      registrationForm.setPassword("12345A");
      assert.strictEqual(registrationForm.password, "12345A");
    });

    it("should accept password with more than 6 characters", () => {
      registrationForm.setPassword("pas12345pas");
      assert.strictEqual(registrationForm.password, "pas12345pas");
    });

    it("should accept mixed-case password", () => {
      registrationForm.setPassword("AabBCc123");
      assert.strictEqual(registrationForm.password, "AabBCc123");
    });
  });

  describe("Confirm Password", () => {
    it("should accept confirm password when it matches password", () => {
      assert.strictEqual(registrationForm.confirmPassword, "Password1!");
    });

    it("should accept confirm password with minimal valid length when it matches password", () => {
      registrationForm.setPassword("ABC123");
      registrationForm.setConfirmPassword("ABC123");
      assert.strictEqual(registrationForm.confirmPassword, "ABC123");
    });
  });

  describe("Form validation", () => {
    it("should return true when form is filled in with valid data", () => {
      assert.strictEqual(registrationForm.isReadyToRegister(), true);
    });
  });
});
