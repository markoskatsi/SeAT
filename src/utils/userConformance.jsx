export const userConformance = {
  html2js: {
    ID: (value) => (value === "" ? null : value),
    Name: (value) => (value === "" ? null : value),
    Title: (value) => (value === "" ? null : value),
    Position: (value) => (value === "" ? null : value),
    AgeGroup: (value) => (value === "" ? null : value),
    PartnerGuestName: (value) => (value === "" ? null : value),
    Location: (value) => (value === "" ? null : value),
  },
  js2html: {
    ID: (value) => value ?? "",
    Name: (value) => value ?? "",
    Title: (value) => value ?? "",
    Position: (value) => value ?? "",
    AgeGroup: (value) => value ?? "",
    PartnerGuestName: (value) => value ?? "",
    Location: (value) => value ?? "",
  },
};
