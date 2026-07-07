import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { createTask } from "../store/slices/taskSlice";

const TaskForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setLoading(true);
    try {
      const result = await dispatch(createTask(form));
      if (createTask.fulfilled.match(result)) {
        toast.success("Task added");
        setForm({ title: "", description: "", priority: "medium", dueDate: "" });
      } else {
        toast.error(result.payload || "Could not add task");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-ink/10 p-5 mb-8 space-y-3">
      <input
        placeholder="Task title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
        className="w-full border border-ink/20 rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent"
      />
      <textarea
        placeholder="Description (optional)"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        rows={2}
        className="w-full border border-ink/20 rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent"
      />
      <div className="flex flex-wrap gap-3">
        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
          className="border border-ink/20 rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-accent"
        >
          <option value="low">Low priority</option>
          <option value="medium">Medium priority</option>
          <option value="high">High priority</option>
        </select>
        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          className="border border-ink/20 rounded-lg px-3 py-2 focus:outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={loading}
          className="ml-auto px-5 py-2 rounded-lg bg-accent text-white hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
