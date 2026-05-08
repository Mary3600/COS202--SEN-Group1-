import AppLayout from "../src/components/AppLayout";
import TaskList from "../src/components/TaskList";

export default function Page() {
  return (
    <AppLayout>
      <TaskList />
    </AppLayout>
  );
}