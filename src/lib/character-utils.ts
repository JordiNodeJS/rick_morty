import { HeartPulse, Skull, HelpCircle, Mars, Venus, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Character } from "./types";

/**
 * Status configuration for visual representation
 */
export interface StatusConfig {
  /** Tailwind classes for the status badge */
  color: string;
  /** Lucide icon component for the status */
  icon: LucideIcon;
  /** Human-readable label */
  label: string;
}

/**
 * Gender configuration for visual representation
 */
export interface GenderConfig {
  /** Lucide icon component for the gender */
  icon: LucideIcon;
  /** Human-readable label */
  label: string;
}

/**
 * Character status types
 */
export type CharacterStatus = "alive" | "dead" | "unknown";

/**
 * Character gender types
 */
export type CharacterGender = "male" | "female" | "genderless" | "unknown";

/**
 * Status configurations map
 */
const STATUS_CONFIGS: Record<CharacterStatus, StatusConfig> = {
  alive: {
    color: "bg-green-500/20 text-green-400 border-green-500/30",
    icon: HeartPulse,
    label: "Alive",
  },
  dead: {
    color: "bg-red-500/20 text-red-400 border-red-500/30",
    icon: Skull,
    label: "Dead",
  },
  unknown: {
    color: "bg-slate-500/20 text-slate-400 border-slate-500/30",
    icon: HelpCircle,
    label: "Unknown",
  },
};

/**
 * Gender configurations map
 */
const GENDER_CONFIGS: Record<CharacterGender, GenderConfig> = {
  male: {
    icon: Mars,
    label: "Male",
  },
  female: {
    icon: Venus,
    label: "Female",
  },
  genderless: {
    icon: User,
    label: "Genderless",
  },
  unknown: {
    icon: HelpCircle,
    label: "Unknown",
  },
};

/**
 * Get status configuration for a character
 * @param status - Character status string
 * @returns StatusConfig object with color, icon, and label
 * 
 * @example
 * ```tsx
 * const config = getStatusConfig(character.status);
 * const StatusIcon = config.icon;
 * <span className={config.color}><StatusIcon /></span>
 * ```
 */
export function getStatusConfig(status: string): StatusConfig {
  const normalizedStatus = status.toLowerCase() as CharacterStatus;
  return STATUS_CONFIGS[normalizedStatus] || STATUS_CONFIGS.unknown;
}

/**
 * Get gender configuration for a character
 * @param gender - Character gender string
 * @returns GenderConfig object with icon and label
 * 
 * @example
 * ```tsx
 * const config = getGenderConfig(character.gender);
 * const GenderIcon = config.icon;
 * <span><GenderIcon /> {config.label}</span>
 * ```
 */
export function getGenderConfig(gender: string): GenderConfig {
  const normalizedGender = gender.toLowerCase() as CharacterGender;
  return GENDER_CONFIGS[normalizedGender] || GENDER_CONFIGS.unknown;
}

/**
 * Check if a character is alive
 * @param character - Character object
 * @returns true if the character status is "Alive"
 */
export function isCharacterAlive(character: Character): boolean {
  return character.status.toLowerCase() === "alive";
}

/**
 * Check if a character is dead
 * @param character - Character object
 * @returns true if the character status is "Dead"
 */
export function isCharacterDead(character: Character): boolean {
  return character.status.toLowerCase() === "dead";
}

/**
 * Get a human-readable description of a character
 * @param character - Character object
 * @returns Formatted string like "Human Male from Earth"
 */
export function getCharacterDescription(character: Character): string {
  const parts = [character.species];
  
  if (character.type) {
    parts.push(`(${character.type})`);
  }
  
  parts.push(character.gender);
  parts.push(`from ${character.origin.name}`);
  
  return parts.join(" ");
}
