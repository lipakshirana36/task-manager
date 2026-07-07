import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../store/slices/taskSlice";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

const FILTERS = [
  { label: "All", value: "" },
  { label: "To Do", value: "todo" },
  { label: "In Progress", value: "in-progress" },
  { label: "Done", value: "done" },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.tasks);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(fetchTasks({ status: filter }));
  }, [dispatch, filter]);

  const doneCount = items.filter((t) => t.status === "done").length;

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">My Tasks</h1>
        <p className="text-ink/60 text-sm">
          {items.length} tasks · {doneCount} completed
        </p>
      </div>

      <TaskForm />

      <div className="flex gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
              filter === f.value
                ? "bg-ink text-base border-ink"
                : "border-ink/20 hover:border-accent hover:text-accent"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading && <p className="text-ink/50">Loading tasks…</p>}
      {!loading && items.length === 0 && (
        <p className="text-ink/50">No tasks yet. Add your first one above.</p>
      )}

      <div className="space-y-3">
        {items.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
