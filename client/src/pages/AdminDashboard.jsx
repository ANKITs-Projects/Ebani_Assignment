import { useContext, useEffect, useState } from "react";
import apicall from "../utils/api";
import FormModal from "../components/FormModal";
import { roleContext } from "../constext/userRole.context";

export default function AdminDashboard() {
  const {setRole} = useContext(roleContext)
  const [users, setUsers] = useState([])

  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState("")
  const [selectedId, setSelectedId] = useState("")
  const [initialData, setInitialData] = useState("")
  const [loading, setLoading] = useState(false)


  const fetchUsers = async () => {
    setLoading(true)
    const res = await apicall("/admin/getusers")
    setUsers(res.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const openModal = (type, data = '', id = '') => {
    setModalType(type)
    setInitialData(data)
    setSelectedId(id)
    setModalOpen(true)
  };

  const handleSubmit = async (formData) => {
    try {
      if (modalType === "createUser") {
        await apicall("/admin/createuser", "POST", formData)
      }

      if (modalType === "editUser") {
        await apicall(`/admin/updateUser/${selectedId}`, "PUT", formData)
      }

      setModalOpen(false)
      fetchUsers()
    } catch (err) {
      console.error(err)
    }
  };

  const handleDelete = async (id) => {
    setLoading(true)
    await apicall(`/admin/deleteuser/${id}`, "DELETE")
    fetchUsers()
    setLoading(false)
  }

  return (
    <div className="p-6">
      
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        
        <button
          onClick={() => openModal("createUser")}
          className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded"
        >
          + Create User
        </button>
        <button
          onClick={() => setRole("")}
          className="bg-red-400 text-white cursor-pointer px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <div className="space-y-4">
      { loading && <h1 className="text-xl font-bold">Loading...</h1>}
        {users.length > 0 &&
          users.map((user) => (
            <div
              key={user._id}
              className="border p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-500">{user.phone}</p>
              </div>

              <div className="flex gap-3">
                <button
                  className="text-blue-500 cursor-pointer"
                  onClick={() => openModal("editUser", user, user._id)}
                >
                  Edit
                </button>

                <button
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDelete(user._id)}
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