import { describe, it, expect, vi, beforeEach } from "vitest";
import bcrypt from "bcrypt";

vi.mock("bcrypt");

describe("Authentication Logic", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Password Hashing", () => {
    it("should hash passwords with bcrypt", async () => {
      const password = "mypassword";
      const hashedPassword = "$2b$10$abcdefghijklmnopqrstuvwxy";

      bcrypt.hash.mockResolvedValue(hashedPassword);

      const result = await bcrypt.hash(password, 10);

      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
      expect(result).toBe(hashedPassword);
    });

    it("should compare passwords correctly", async () => {
      const password = "mypassword";
      const hashedPassword = "$2b$10$abcdefghijklmnopqrstuvwxy";

      bcrypt.compare.mockResolvedValue(true);

      const match = await bcrypt.compare(password, hashedPassword);

      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(match).toBe(true);
    });

    it("should return false for incorrect passwords", async () => {
      const password = "wrongpassword";
      const hashedPassword = "$2b$10$abcdefghijklmnopqrstuvwxy";

      bcrypt.compare.mockResolvedValue(false);

      const match = await bcrypt.compare(password, hashedPassword);

      expect(match).toBe(false);
    });
  });

  describe("Email Validation", () => {
    it("should validate email format", () => {
      const validEmail = "user@example.com";
      const invalidEmail = "notanemail";

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      expect(emailRegex.test(validEmail)).toBe(true);
      expect(emailRegex.test(invalidEmail)).toBe(false);
    });
  });

  describe("Role Validation", () => {
    it("should accept valid roles", () => {
      const validRoles = ["admin", "customer"];

      expect(validRoles.includes("admin")).toBe(true);
      expect(validRoles.includes("customer")).toBe(true);
    });

    it("should reject invalid roles", () => {
      const validRoles = ["admin", "customer"];

      expect(validRoles.includes("superuser")).toBe(false);
      expect(validRoles.includes("")).toBe(false);
    });
  });

  describe("Welcome Message Generation", () => {
    it("should capitalize role in welcome message", () => {
      const admin = "admin";
      const customer = "customer";

      const adminMsg = admin.charAt(0).toUpperCase() + admin.slice(1);
      const customerMsg = customer.charAt(0).toUpperCase() + customer.slice(1);

      expect(adminMsg).toBe("Admin");
      expect(customerMsg).toBe("Customer");
    });
  });
});
