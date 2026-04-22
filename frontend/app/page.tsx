export default function CalendarView() {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Monthly Calendar View</h2>

      {/* Days row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          marginBottom: "10px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "10px",
        }}
      >
        {[...Array(31)].map((_, index) => (
          <div
            key={index}
            style={{
              height: "80px",
              borderRadius: "10px",
              backgroundColor: "#f5f5f5",
              padding: "10px",
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}