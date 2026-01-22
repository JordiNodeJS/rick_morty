import { describe, it, expect } from "vitest";
import {
  getStatusConfig,
  getGenderConfig,
  isCharacterAlive,
  isCharacterDead,
  getCharacterDescription,
} from "../character-utils";
import { mockCharacter, mockDeadCharacter, mockUnknownCharacter } from "@/test/mocks";

describe("character-utils", () => {
  describe("getStatusConfig", () => {
    it("returns green config for alive status", () => {
      const config = getStatusConfig("Alive");

      expect(config.color).toContain("green");
      expect(config.label).toBe("Alive");
    });

    it("returns red config for dead status", () => {
      const config = getStatusConfig("Dead");

      expect(config.color).toContain("red");
      expect(config.label).toBe("Dead");
    });

    it("returns slate config for unknown status", () => {
      const config = getStatusConfig("unknown");

      expect(config.color).toContain("slate");
      expect(config.label).toBe("Unknown");
    });

    it("handles case insensitivity", () => {
      expect(getStatusConfig("ALIVE").color).toContain("green");
      expect(getStatusConfig("alive").color).toContain("green");
      expect(getStatusConfig("Alive").color).toContain("green");
    });

    it("returns unknown config for invalid status", () => {
      const config = getStatusConfig("invalid");

      expect(config.color).toContain("slate");
      expect(config.label).toBe("Unknown");
    });
  });

  describe("getGenderConfig", () => {
    it("returns config for male gender", () => {
      const config = getGenderConfig("Male");

      expect(config.label).toBe("Male");
      expect(config.icon).toBeDefined();
    });

    it("returns config for female gender", () => {
      const config = getGenderConfig("Female");

      expect(config.label).toBe("Female");
      expect(config.icon).toBeDefined();
    });

    it("returns config for genderless", () => {
      const config = getGenderConfig("Genderless");

      expect(config.label).toBe("Genderless");
      expect(config.icon).toBeDefined();
    });

    it("returns unknown config for unknown gender", () => {
      const config = getGenderConfig("unknown");

      expect(config.label).toBe("Unknown");
      expect(config.icon).toBeDefined();
    });

    it("handles case insensitivity", () => {
      expect(getGenderConfig("MALE").label).toBe("Male");
      expect(getGenderConfig("male").label).toBe("Male");
      expect(getGenderConfig("Male").label).toBe("Male");
    });
  });

  describe("isCharacterAlive", () => {
    it("returns true for alive character", () => {
      expect(isCharacterAlive(mockCharacter)).toBe(true);
    });

    it("returns false for dead character", () => {
      expect(isCharacterAlive(mockDeadCharacter)).toBe(false);
    });

    it("returns false for unknown status character", () => {
      expect(isCharacterAlive(mockUnknownCharacter)).toBe(false);
    });
  });

  describe("isCharacterDead", () => {
    it("returns true for dead character", () => {
      expect(isCharacterDead(mockDeadCharacter)).toBe(true);
    });

    it("returns false for alive character", () => {
      expect(isCharacterDead(mockCharacter)).toBe(false);
    });

    it("returns false for unknown status character", () => {
      expect(isCharacterDead(mockUnknownCharacter)).toBe(false);
    });
  });

  describe("getCharacterDescription", () => {
    it("returns description for character without type", () => {
      const description = getCharacterDescription(mockCharacter);

      expect(description).toContain(mockCharacter.species);
      expect(description).toContain(mockCharacter.gender);
      expect(description).toContain(mockCharacter.origin.name);
    });

    it("includes type when present", () => {
      const characterWithType = {
        ...mockCharacter,
        type: "Genetic experiment",
      };

      const description = getCharacterDescription(characterWithType);

      expect(description).toContain("(Genetic experiment)");
    });

    it("formats description correctly", () => {
      const description = getCharacterDescription(mockCharacter);

      expect(description).toBe("Human Male from Earth (C-137)");
    });
  });
});
