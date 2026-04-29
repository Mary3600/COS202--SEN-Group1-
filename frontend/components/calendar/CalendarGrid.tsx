import DayBox from "./DayBox";

export default function CalendarGrid({ currentDate, tasks }: any) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const getColor = (priority: string) => {
    if (priority === "high") return "#de2e2e";
    if (priority === "medium") return "#fbb128";
    return "#3ceb42";
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "15px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {[...Array(35)].map((_, index) => {
        const currentDay = index - firstDay + 1;
        const prevMonthDays = new Date(year, month, 0).getDate();

        let displayDay;
        let isCurrentMonth = true;

        if (currentDay <= 0) {
          displayDay = prevMonthDays + currentDay;
          isCurrentMonth = false;
        } else if (currentDay > daysInMonth) {
          displayDay = currentDay - daysInMonth;
          isCurrentMonth = false;
        } else {
          displayDay = currentDay;
        }

        const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(displayDay).padStart(2, "0")}`;
        const dayTasks = tasks.filter((task: any) => task.date === fullDate);

        const isToday =
          isCurrentMonth &&
          displayDay === new Date().getDate() &&
          month === new Date().getMonth() &&
          year === new Date().getFullYear();

        return (
          <DayBox
            key={index}
            displayDay={displayDay}
            isCurrentMonth={isCurrentMonth}
            isToday={isToday}
            dayTasks={dayTasks}
            getColor={getColor}
          />
        );
      })}
    </div>
  );
}