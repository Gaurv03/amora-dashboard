// --------------- Account Status ----------------
export const AccountStatus = {
  active: "active",
  suspend: "suspended",
  ban: "banned",
} as const;
export type AccountStatus = (typeof AccountStatus)[keyof typeof AccountStatus];

// ---------------- Political View ----------------
export const PoliticalViewOptions = [
  { label: "Democrat", value: "Democrat" },
  { label: "Republican", value: "Republican" },
  { label: "Liberal", value: "Liberal" },
  { label: "Independent", value: "Independent" },
  { label: "Libertarian", value: "Libertarian" },
  { label: "Indifferent", value: "Indifferent" },
  { label: "I Love Everyone", value: "I Love Everyone" },
  { label: "Other", value: "Other" },
] as const;
export type PoliticalView = (typeof PoliticalViewOptions)[number]["value"];

// ---------------- Zodiac Sign ----------------
export const ZodiacSignOptions = [
  { label: "Aries", value: "Aries" },
  { label: "Taurus", value: "Taurus" },
  { label: "Gemini", value: "Gemini" },
  { label: "Cancer", value: "Cancer" },
  { label: "Leo", value: "Leo" },
  { label: "Virgo", value: "Virgo" },
  { label: "Libra", value: "Libra" },
  { label: "Scorpio", value: "Scorpio" },
  { label: "Sagittarius", value: "Sagittarius" },
  { label: "Capricorn", value: "Capricorn" },
  { label: "Aquarius", value: "Aquarius" },
  { label: "Pisces", value: "Pisces" },
  { label: "Prefer not to say", value: "Prefer not to say" },
] as const;
export type ZodiacSign = (typeof ZodiacSignOptions)[number]["value"];

// ---------------- Gender ----------------
export const GenderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
] as const;
export type Gender = (typeof GenderOptions)[number]["value"];

// ---------------- Religion ----------------
export const ReligionOptions = [
  { label: "Christian", value: "Christian" },
  { label: "Muslim", value: "Muslim" },
  { label: "Hindu", value: "Hindu" },
  { label: "Kabbalist", value: "Kabbalist" },
  { label: "Mormon", value: "Mormon" },
  { label: "Catholic", value: "Catholic" },
  { label: "Jewish", value: "Jewish" },
  { label: "Atheist", value: "Atheist" },
  { label: "Agnostic", value: "Agnostic" },
  { label: "Spiritual", value: "Spiritual" },
  { label: "Jain", value: "Jain" },
  { label: "Sikh", value: "Sikh" },
  { label: "Other", value: "Other" },
] as const;
export type Religion = (typeof ReligionOptions)[number]["value"];

// ---------------- Education ----------------
export const EducationOptions = [
  { label: "High School", value: "High School" },
  { label: "Trade School", value: "Trade School" },
  { label: "In Collage", value: "In Collage" },
  { label: "Associate's Degree", value: "Associate's Degree" },
  { label: "Bachelor’s Degree", value: "Bachelor’s Degree" },
  { label: "Master’s Degree", value: "Master’s Degree" },
  { label: "Doctorate", value: "Doctorate" },
  { label: "Other", value: "Other" },
] as const;
export type Education = (typeof EducationOptions)[number]["value"];

// ---------------- Child Pref ----------------
export const ChildrenPrefOptions = [
  { label: "Want children someday", value: "Want children someday" },
  { label: "Have children", value: "Have children" },
  { label: "Don't want children", value: "Don't want children" },
  { label: "Open to children", value: "Open to children" },
] as const;
export type ChildrenPref = (typeof ChildrenPrefOptions)[number]["value"];

// ---------------- Pets ----------------
export const PetsOptions = [
  { value: "Dog", label: "Dog" },
  { value: "Cat", label: "Cat" },
  { value: "Bird", label: "Bird" },
  { value: "Fish", label: "Fish" },
  { value: "Reptile", label: "Reptile" },
  { value: "Other", label: "Other" },
  { value: "No pets", label: "No pets" },
  { value: "Want pets", label: "Want pets" },
] as const;
export type Pets = (typeof PetsOptions)[number]["value"]; // union type

// ---------------- Drinking ----------------
export const DrinkingOptions = [
  { label: "Never", value: "Never" },
  { label: "I drink socially", value: "I drink socially" },
  { label: "Yes, I drink", value: "Yes, I drink" },
  { label: "Yes, but trying to quit", value: "Yes, but trying to quit" },
] as const;
export type Drinking = (typeof DrinkingOptions)[number]["value"];

// ---------------- Smoking ----------------
export const SmokingOptions = [
  { label: "Never", value: "Never" },
  { label: "I smoke socially", value: "I smoke socially" },
  { label: "Yes, I smoke", value: "Yes, I smoke" },
  { label: "Yes, but trying to quit", value: "Yes, but trying to quit" },
] as const;
export type Smoking = (typeof SmokingOptions)[number]["value"];

// ---------------- Exercise ----------------
export const ExerciseOptions = [
  { label: "Daily", value: "Daily" },
  { label: "Several times a week", value: "Several times a week" },
  { label: "Rarely", value: "Rarely" },
  { label: "Never", value: "Never" },
] as const;
export type Exercise = (typeof ExerciseOptions)[number]["value"];
