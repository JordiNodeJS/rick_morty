import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { EpisodeCard } from "../EpisodeCard";
import { mockEpisode } from "@/test/mocks";

describe("EpisodeCard", () => {
  describe("rendering", () => {
    it("renders episode name", () => {
      render(<EpisodeCard episode={mockEpisode} />);

      expect(screen.getByText(mockEpisode.name)).toBeInTheDocument();
    });

    it("renders episode code", () => {
      render(<EpisodeCard episode={mockEpisode} />);

      expect(screen.getByText(mockEpisode.episode)).toBeInTheDocument();
    });

    it("renders air date", () => {
      render(<EpisodeCard episode={mockEpisode} />);

      expect(
        screen.getByText(`Emitido el ${mockEpisode.air_date}`)
      ).toBeInTheDocument();
    });

    it("renders character count", () => {
      render(<EpisodeCard episode={mockEpisode} />);

      expect(
        screen.getByText(`${mockEpisode.characters.length} personajes`)
      ).toBeInTheDocument();
    });

    it("links to episode detail page", () => {
      render(<EpisodeCard episode={mockEpisode} />);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", `/episodes/${mockEpisode.id}`);
    });
  });

  describe("different episodes", () => {
    it("handles episode with many characters", () => {
      const episodeWithManyCharacters = {
        ...mockEpisode,
        characters: Array(50).fill("https://rickandmortyapi.com/api/character/1"),
      };

      render(<EpisodeCard episode={episodeWithManyCharacters} />);

      expect(screen.getByText("50 personajes")).toBeInTheDocument();
    });

    it("handles episode with one character", () => {
      const episodeWithOneCharacter = {
        ...mockEpisode,
        characters: ["https://rickandmortyapi.com/api/character/1"],
      };

      render(<EpisodeCard episode={episodeWithOneCharacter} />);

      expect(screen.getByText("1 personajes")).toBeInTheDocument();
    });
  });
});
