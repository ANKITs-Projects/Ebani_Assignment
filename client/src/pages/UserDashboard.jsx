import { useContext, useEffect, useState } from "react";
import apicall from "../utils/api";
import FormModal from "../components/FormModal";
import { roleContext } from "../constext/userRole.context";

export default function UserDashboard() {
  const {setRole} = useContext(roleContext)
  const [tasks, setTasks] = useState([])

  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState("")
  const [selectedId, setSelectedId] = useState('')
  const [initialData, setInitialData] = useState('')

  const fetchTasks = async () => {
    const res = await apicall("/user/gettask")
    setTasks(res.data)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const openModal = (type, data = "", id = '') => {
    setModalType(type)
    setInitialData(data)
    setSelectedId(id)
    setModalOpen(true)
  }

  const handleSubmit = async (formData) => {
    try {
      if (modalType === "createTask") {
        await apicall("/user/createtask", "POST", formData)
      }

      if (modalType === "editTask") {
        await apicall(`/user/updatetask/${selectedId}`, "PUT", formData)
      }

      setModalOpen(false)
      fetchTasks()
    } catch (err) {
      console.error(err)
    }
  };

  const handleDelete = async (id) => {
    await apicall(`/user/delettask/${id}`, "DELETE")
    fetchTasks()
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-5">
        <h1 className="text-xl font-bold">User Dashboard</h1>

        <button
          onClick={() => openModal("createTask")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Create Task
        </button>
        <button
          onClick={() => setRole("")}
          className="bg-red-400 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="space-y-3">
        {tasks.length > 0 &&
          tasks.map((task) => (
            <div
              key={task._id}
              className="flex justify-between border p-3 rounded"
            >
              <span>{task.task}</span>

              <div className="flex gap-3">
                <button
                  className="text-blue-500"
                  onClick={() => openModal("editTask", task, task._id)}
                >
                  Edit
                </button>

                <button
                  className="text-red-500"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      <FormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={initialData}
        title={modalType}
        type={modalType}
      />
    </div>
  );
}