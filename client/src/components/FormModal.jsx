import { useState, useEffect } from "react";

export default function FormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
  type,
}) {
  const [form, setForm] = useState({})

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        password: "",
        task: initialData?.task || ""
      })
    } else {
      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        task: ""
      })
    }
  }, [initialData])

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  
  if (!isOpen) return null

    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
          <h2 className="text-lg font-semibold mb-4 capitalize">{title}</h2>

          {(type === "editAdmin" || type === "editUser" || type === "createAdmin" || type === "createUser") && (
            <>
              <input
                name="name"
                placeholder="Name"
                className="w-full border p-2 mb-3 rounded"
                value={form.name}
                onChange={handleChange}
              />

              <input
                name="phone"
                placeholder="Phone"
                className="w-full border p-2 mb-3 rounded"
                value={form.phone}
                onChange={handleChange}
              />
            </>
          )}

          {(type === "createAdmin" || type === "createUser") && (
            <input
              name="email"
              placeholder="Email"
              className="w-full border p-2 mb-3 rounded"
              value={form.email}
              onChange={handleChange}
            />
          )}

          {(type === "createAdmin" || type === "createUser") && (
            <input
              type="text"
              name="password"
              placeholder="Password"
              className="w-full border p-2 mb-3 rounded"
              value={form.password}
              onChange={handleChange}
            />
          )}

          {(type === "createTask" || type === "editTask") && (
            <>
              <input
                name="task"
                placeholder="Task"
                className="w-full border p-2 mb-3 rounded"
                value={form.task || ""}
                onChange={handleChange}
              />
            </>
          )}

          <div className="flex justify-end gap-2">
            <button className="px-3 py-1 bg-gray-300 rounded cursor-pointer" onClick={onClose}>
              Cancel
            </button>

            <button
              className="px-3 py-1 bg-blue-500 text-white rounded cursor-pointer"
              onClick={() => onSubmit(form)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
}
