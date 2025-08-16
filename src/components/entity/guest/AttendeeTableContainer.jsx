import AttendeeTable from "./AttendeeTable";

export default function AttendeeTableContainer({ attendees }) {
  if (!attendees) return <p>Loading...</p>;
  if (attendees.length === 0) return <p>No attendees found</p>;

  // Group attendees by AttendeeSeat
  const groupedBySeat = attendees.reduce((acc, attendee, index) => {
    const seat = attendee.AttendeeSeat || "Unassigned";

    if (!acc[seat]) acc[seat] = [];
    acc[seat].push(attendee);

    console.log(
      `Step ${index + 1}: added attendee "${
        attendee.AttendeeName
      }" to seat "${seat}"`
    );
    console.log("Current state of acc:", JSON.stringify(acc, null, 2)); // pretty print

    return acc;
  }, {});

  return (
    <>
      {Object.entries(groupedBySeat).map(([seat, seatAttendees]) => (
        <AttendeeTable
          key={seat}
          tableNumber={seat} // show seat label instead of index
          attendees={seatAttendees}
        />
      ))}
    </>
  );
}
