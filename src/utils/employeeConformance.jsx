export const employeeConformance = {
  html2js: {
    UserFirstname: (value) => (value === "" ? null : value),
    UserLastname: (value) => (value === "" ? null : value),
    UserDateofbirth: (value) => (value === "" ? null : value),
    UserUsertypeName: (value) => (value === "" ? null : value),
    UserRoleName: (value) => (value === "" ? null : value),
    UserRoleID: (value) => (value === "0" ? null : value),
    UserImageURL: (value) => (value === "" ? null : value),
    UserEmail: (value) => (value === "" ? null : value),
    UserUsertypeID: (value) => (value === "" ? null : value),
  },
  js2html: {
    UserFirstname: (value) => value ?? "",
    UserLastname: (value) => value ?? "",
    UserDateofbirth: (value) => value ?? "",
    UserUsertypeName: (value) => value ?? "",
    UserRoleName: (value) => value ?? "",
    UserRoleID: (value) => value ?? "0",
    UserImageURL: (value) => value ?? "",
    UserEmail: (value) => value ?? "",
    UserUsertypeID: (value) => value ?? "",
  },
};

export function normaliseParticipants(rawData) {
  return rawData.map((row, idx) => ({
    id: row.UserID || row.id || `p${idx}`,
    name: `${row.UserFirstname || ""} ${row.UserLastname || ""}`.trim(),
    role: row.UserRoleName || row.role || "",
    ageCategory: row.AgeCategory || "",
    gender: row.Gender || "",
    guestOf: row.UserGuestofID || row.guestOf || null,
    previousNeighbors: row.PreviousNeighbors
      ? String(row.PreviousNeighbors)
          .split(",")
          .map((id) => id.trim())
          .filter(Boolean)
      : [],
    ...row,
  }));
}

export function groupParticipantsWithGuests(participants) {
  const guestMap = {};
  participants.forEach((p) => {
    if (p.guestOf) {
      guestMap[p.guestOf] = p;
    }
  });

  const grouped = [];
  participants.forEach((p) => {
    if (!p.guestOf) {
      if (guestMap[p.id]) {
        grouped.push([p, guestMap[p.id]]);
      } else {
        grouped.push([p]);
      }
    }
  });

  return grouped;
}