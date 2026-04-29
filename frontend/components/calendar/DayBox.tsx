type Task = {
  id: number;
  title: string;
  date: string;
  priority: string;
};

export default function DayBox({
  displayDay,
  isCurrentMonth,
  isToday,
  dayTasks,
  getColor,
}: {
  displayDay: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  dayTasks: Task[];
  getColor: (priority: string) => string;
}) {
  const visibleTasks = dayTasks.slice(0, 2);
  const remainingCount = dayTasks.length - visibleTasks.length;

  return (
    <div
      style={{
        height: "100px",
        border: "1px solid #eee",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        borderRadius: "12px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        opacity: isCurrentMonth ? 1 : 0.4,
        backgroundColor: isToday ? "#165A50" : "#f5f5f5",
      }}
    >
      {/* DATE */}
      <div
        style={{
          fontWeight: "600",
          fontSize: "14px",
          color: isToday ? "#fff" : "#333",
        }}
      >
        {displayDay}
      </div>

      {/* TASKS */}
      {visibleTasks.map((task) => (
        <div
          key={task.id}
          style={{
            backgroundColor: getColor(task.priority),
            color: "#fff",
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "10px",
            marginTop: "4px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {task.title}
        </div>
      ))}

      {remainingCount > 0 && (
        <div
          style={{
            fontSize: "10px",
            color: isToday ? "#fff" : "#555",
            marginTop: "4px",
          }}
        >
          +{remainingCount} more
        </div>
      )}
    </div>
  );
}