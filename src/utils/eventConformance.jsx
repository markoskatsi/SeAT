export const eventConformance = {
    html2js: {
      EventID: (value) => (value === "" ? null : value),
      EventName: (value) => (value === "" ? null : value),
      EventDescription: (value) => (value === "" ? null : value),
      EventDatetime: (value) => (value === "" ? null : value),
      EventLocationID: (value) => (value === "" ? null : value),
      EventLocationName: (value) => (value === "0" ? null : value),
    },
    js2html: {
      EventID: (value) => (value === null ? "" : value),
      EventName: (value) => (value === null ? "" : value),
      EventDescription: (value) => (value === null ? "" : value),
      EventDatetime: (value) => (value === null ? "" : value),
      EventLocationID: (value) => (value === null ? "" : value),
      EventLocationName: (value) => (value === null ? "0" : value),
    },
  };