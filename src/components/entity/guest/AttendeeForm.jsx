import { useEffect } from "react";
import Form from "../../UI/Form.jsx";

function AttendeeForm({ attendee: attendeeProp, onSubmit, onCancel }) {
  const initialAttendee = {
    FirstName: "",
    LastName: "",
    AttendeeEmail: "",
  };

  const validation = {
    isValid: {
      FirstName: (name) => name && name.length > 1,
      LastName: (name) => name && name.length > 1,
      AttendeeEmail: (email) => email && email.includes("@"),
    },
    errorMessage: {
      FirstName: "First name must be at least 2 characters long",
      LastName: "Last name must be at least 2 characters long",
      AttendeeEmail: "Email must be valid",
    },
  };

  const [attendee, errors, handleChange, handleSubmit, setAttendee] =
    Form.useForm(initialAttendee, {}, validation, (values) => {
      const submitData = {
        ...values,
        AttendeeName: `${values.FirstName} ${values.LastName}`.trim(),
      };
      onSubmit(submitData);
    });

  useEffect(() => {
    if (attendeeProp) {
      const [first, ...rest] = (attendeeProp.AttendeeName || "").split(" ");
      setAttendee({
        FirstName: first || "",
        LastName: rest.join(" ") || "",
        AttendeeEmail: attendeeProp.AttendeeEmail || "",
      });
    }
  }, [attendeeProp, setAttendee]);

  return (
    <Form className="formTray" onSubmit={handleSubmit} onCancel={onCancel}>
      <Form.Item label="First Name" error={errors.FirstName}>
        <input
          type="text"
          name="FirstName"
          value={attendee.FirstName}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Last Name" error={errors.LastName}>
        <input
          type="text"
          name="LastName"
          value={attendee.LastName}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Email" error={errors.AttendeeEmail}>
        <input
          type="email"
          name="AttendeeEmail"
          value={attendee.AttendeeEmail}
          onChange={handleChange}
        />
      </Form.Item>
    </Form>
  );
}

export default AttendeeForm;
