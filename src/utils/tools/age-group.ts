export interface AgeGroupItem {
  id: number | string;
  age: string; // e.g., "3" or "3-5"
}

export const calculateAgeFromDob = (dobIsoOrDateString: string, asOf: Date = new Date()): number | null => {
  if (!dobIsoOrDateString) return null;
  const birth = new Date(dobIsoOrDateString);
  if (Number.isNaN(birth.getTime())) return null;

  let age = asOf.getFullYear() - birth.getFullYear();
  const monthDiff = asOf.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && asOf.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age;
};

export const findAgeGroupIdByAge = (age: number, groups: AgeGroupItem[] | undefined | null): string | null => {
  if (age == null || !Array.isArray(groups)) return null;
  const match = groups.find((group) => {
    const token = String(group.age || "").trim();
    if (!token) return false;
    if (token.includes("-")) {
      const [min, max] = token.split("-").map((n) => Number(n));
      if (Number.isFinite(min) && Number.isFinite(max)) {
        return age >= min && age <= max;
      }
      return false;
    }
    const exact = Number(token);
    return Number.isFinite(exact) && exact === age;
  });
  return match ? String(match.id) : null;
};

export const deriveAgeGroupIdFromDob = (
  dobIsoOrDateString: string,
  groups: AgeGroupItem[] | undefined | null,
  asOf: Date = new Date(),
): string | null => {
  const age = calculateAgeFromDob(dobIsoOrDateString, asOf);
  if (age == null) return null;
  return findAgeGroupIdByAge(age, groups);
};

export const getChildDobBounds = (asOf: Date = new Date()): { minDate: Date; maxDate: Date } => {
  const maxDate = new Date(asOf.getFullYear() - 3, asOf.getMonth(), asOf.getDate());
  const minDate = new Date(asOf.getFullYear() - 18, asOf.getMonth(), asOf.getDate());
  return { minDate, maxDate };
};


