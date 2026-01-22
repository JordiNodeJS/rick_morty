import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CharacterCard } from "../CharacterCard";
import {
  mockCharacter,
  mockDeadCharacter,
  mockUnknownCharacter,
} from "@/test/mocks";

describe("CharacterCard", () => {
  describe("rendering", () => {
    it("renders character name", () => {
      render(<CharacterCard character={mockCharacter} />);

      expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    });

    it("renders character species", () => {
      render(<CharacterCard character={mockCharacter} />);

      expect(screen.getByText(mockCharacter.species)).toBeInTheDocument();
    });

    it("renders character origin", () => {
      render(<CharacterCard character={mockCharacter} />);

      expect(screen.getByText(mockCharacter.origin.name)).toBeInTheDocument();
    });

    it("renders character image", () => {
      render(<CharacterCard character={mockCharacter} />);

      const img = screen.getByAltText(mockCharacter.name);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", mockCharacter.image);
    });

    it("links to character detail page", () => {
      render(<CharacterCard character={mockCharacter} />);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", `/characters/${mockCharacter.id}`);
    });
  });

  describe("status display", () => {
    it("displays Alive status", () => {
      render(<CharacterCard character={mockCharacter} />);

      const statusBadge = screen.getByText("Alive");
      expect(statusBadge).toBeInTheDocument();
    });

    it("displays Dead status", () => {
      render(<CharacterCard character={mockDeadCharacter} />);

      const statusBadge = screen.getByText("Dead");
      expect(statusBadge).toBeInTheDocument();
    });

    it("displays unknown status", () => {
      render(<CharacterCard character={mockUnknownCharacter} />);

      const statusBadge = screen.getByText("unknown");
      expect(statusBadge).toBeInTheDocument();
    });

    it("applies green styling for alive characters", () => {
      render(<CharacterCard character={mockCharacter} />);

      const statusBadge = screen.getByText("Alive");
      expect(statusBadge.className).toContain("green");
    });

    it("applies red styling for dead characters", () => {
      render(<CharacterCard character={mockDeadCharacter} />);

      const statusBadge = screen.getByText("Dead");
      expect(statusBadge.className).toContain("red");
    });

    it("applies slate styling for unknown status", () => {
      render(<CharacterCard character={mockUnknownCharacter} />);

      const statusBadge = screen.getByText("unknown");
      expect(statusBadge.className).toContain("slate");
    });
  });
});
