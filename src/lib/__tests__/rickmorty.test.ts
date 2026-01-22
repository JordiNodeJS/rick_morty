import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  extractIdFromUrl,
  extractIdsFromUrls,
} from "../rickmorty";

describe("rickmorty utilities", () => {
  describe("extractIdFromUrl", () => {
    it("should extract id from character URL", () => {
      const url = "https://rickandmortyapi.com/api/character/1";
      expect(extractIdFromUrl(url)).toBe(1);
    });

    it("should extract id from episode URL", () => {
      const url = "https://rickandmortyapi.com/api/episode/28";
      expect(extractIdFromUrl(url)).toBe(28);
    });

    it("should extract id from location URL", () => {
      const url = "https://rickandmortyapi.com/api/location/3";
      expect(extractIdFromUrl(url)).toBe(3);
    });

    it("should handle large IDs", () => {
      const url = "https://rickandmortyapi.com/api/character/826";
      expect(extractIdFromUrl(url)).toBe(826);
    });
  });

  describe("extractIdsFromUrls", () => {
    it("should extract multiple IDs from URL array", () => {
      const urls = [
        "https://rickandmortyapi.com/api/episode/1",
        "https://rickandmortyapi.com/api/episode/2",
        "https://rickandmortyapi.com/api/episode/3",
      ];
      expect(extractIdsFromUrls(urls)).toEqual([1, 2, 3]);
    });

    it("should return empty array for empty input", () => {
      expect(extractIdsFromUrls([])).toEqual([]);
    });

    it("should handle single URL", () => {
      const urls = ["https://rickandmortyapi.com/api/character/1"];
      expect(extractIdsFromUrls(urls)).toEqual([1]);
    });
  });
});

describe("rickmorty API functions", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("getCharacters", () => {
    it("should fetch characters from API", async () => {
      const mockResponse = {
        info: { count: 826, pages: 42, next: null, prev: null },
        results: [{ id: 1, name: "Rick Sanchez" }],
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const { getCharacters } = await import("../rickmorty");
      const result = await getCharacters(1);

      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        "https://rickandmortyapi.com/api/character",
        expect.any(Object)
      );
    });

    it("should handle pagination", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ info: {}, results: [] }),
      });

      const { getCharacters } = await import("../rickmorty");
      await getCharacters(2);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("page=2"),
        expect.any(Object)
      );
    });

    it("should throw error on API failure", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      });

      const { getCharacters } = await import("../rickmorty");

      await expect(getCharacters(1)).rejects.toThrow("API Error: 500");
    });
  });

  describe("getCharacter", () => {
    it("should fetch single character by ID", async () => {
      const mockCharacter = { id: 1, name: "Rick Sanchez" };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockCharacter),
      });

      const { getCharacter } = await import("../rickmorty");
      const result = await getCharacter(1);

      expect(result).toEqual(mockCharacter);
      expect(fetch).toHaveBeenCalledWith(
        "https://rickandmortyapi.com/api/character/1",
        expect.any(Object)
      );
    });
  });

  describe("getMultipleCharacters", () => {
    it("should return empty array for empty IDs", async () => {
      const { getMultipleCharacters } = await import("../rickmorty");
      const result = await getMultipleCharacters([]);

      expect(result).toEqual([]);
    });

    it("should call getCharacter for single ID", async () => {
      const mockCharacter = { id: 1, name: "Rick" };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockCharacter),
      });

      const { getMultipleCharacters } = await import("../rickmorty");
      const result = await getMultipleCharacters([1]);

      expect(result).toEqual([mockCharacter]);
    });

    it("should fetch multiple characters at once", async () => {
      const mockCharacters = [
        { id: 1, name: "Rick" },
        { id: 2, name: "Morty" },
      ];

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockCharacters),
      });

      const { getMultipleCharacters } = await import("../rickmorty");
      const result = await getMultipleCharacters([1, 2]);

      expect(result).toEqual(mockCharacters);
      expect(fetch).toHaveBeenCalledWith(
        "https://rickandmortyapi.com/api/character/1,2",
        expect.any(Object)
      );
    });
  });
});
