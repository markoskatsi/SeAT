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