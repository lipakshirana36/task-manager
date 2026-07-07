import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { updateTask, deleteTask } from "../store/slices/taskSlice";

const PRIORITY_COLORS = {
  low: "bg-done/10 text-done",
  medium: "bg-warn/10 text-warn",
  high: "bg-danger/10 text-danger",
};

const STATUS_LABELS = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
};

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const cycleStatus = () => {
    const order = ["todo", "in-progress", "done"];
    const next = order[(order.indexOf(task.status) + 1) % order.length];
    dispatch(updateTask({ id: task._id, payload: { status: next } }));
  };

  const handleDelete = async () => {
    if (!confirm("Delete this task?")) return;
    const result = await dispatch(deleteTask(task._id));
    if (deleteTask.fulfilled.match(result)) {
      toast.success("Task deleted");
    } else {
      toast.error(result.payload || "Could not delete task");
    }
  };

  const saveTitle = () => {
    if (title.trim() && title !== task.title) {
      dispatch(updateTask({ id: task._id, payload: { title } }));
    }
    setEditing(false);
  };

  return (
    <div className="bg-white rounded-xl border border-ink/10 p-4 flex items-start gap-4">
      <button
        onClick={cycleStatus}
        title="Click to change status"
        className={`mt-1 w-5 h-5 rounded-full border-2 flex-shrink-0 transition-colors ${
          task.status === "done"
            ? "bg-done border-done"
            : task.status === "in-progress"
            ? "bg-warn border-warn"
            : "border-ink/30"
        }`}
      />

      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={saveTitle}
            onKeyDown={(e) => e.key === "Enter" && saveTitle()}
            autoFocus
            className="w-full border-b border-accent focus:outline-none font-medium"
          />
        ) : (
          <h3
            onClick={() => setEditing(true)}
            className={`font-medium cursor-text ${
              task.status === "done" ? "line-through text-ink/40" : ""
            }`}
          >
            {task.title}
          </h3>
        )}
        {task.description && (
          <p className="text-sm text-ink/60 mt-1">{task.description}</p>
        )}
        <div className="flex items-center gap-2 mt-2 text-xs">
          <span className={`px-2 py-0.5 rounded-full ${PRIORITY_COLORS[task.priority]}`}>
            {task.priority}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-ink/5 text-ink/60">
            {STATUS_LABELS[task.status]}
          </span>
          {task.dueDate && (
            <span className="text-ink/40">
              Due {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={handleDelete}
        className="text-ink/30 hover:text-danger transition-colors text-sm"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
