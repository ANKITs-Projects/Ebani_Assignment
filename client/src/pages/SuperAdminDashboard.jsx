import { useContext, useEffect, useState } from "react";
import apicall from "../utils/api";
import FormModal from "../components/FormModal";
import { roleContext } from "../constext/userRole.context";

export default function SuperAdminDashboard() {
  const {setRole} = useContext(roleContext)
  const [admins, setAdmins] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState("") 
  const [selectedId, setSelectedId] = useState("")
  const [initialData, setInitialData] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchAdmins = async () => {
    setLoading(true)
    const res = await apicall("/superadmin/getadmins")
    setAdmins(res.data)
    setLoading(false)
  };

  useEffect(() => {
    fetchAdmins()
  }, [])

  const openModal = (type, data = "", id = "") => {
    setModalType(type)
    setInitialData(data)
    setSelectedId(id)
    setModalOpen(true)
  }

  const handleSubmit = async (formData) => {
    try {
      if (modalType === "createAdmin") {
        await apicall("/superadmin/createadmin", "POST", formData)
      }

      if (modalType === "editAdmin") {
        await apicall(
          `/superadmin/updateadmins/${selectedId}`,
          "PUT",
          formData,
        );
      }

      if (modalType === "createUser") {
        await apicall("/superadmin/createuser", "POST", {
          ...formData,
          adminId: selectedId,
        })
      }

      if (modalType === "editUser") {
        await apicall(`/superadmin/updateuser/${selectedId}`, "PUT", formData)
      }

      setModalOpen(false)
      fetchAdmins()
    } catch (err) {
      console.error(err)
    }
  };

  const handleDelete = async (id, type) => {
    setLoading(true)
    if (type === "admin") {
      await apicall(`/superadmin/deleteadmin/${id}`, "DELETE")
    } else {
      await apicall(`/superadmin/deleteuser/${id}`, "DELETE")
    }
    fetchAdmins()
  };

  return (
    <div className="p-6">
      
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
        
        <button
          onClick={() => openModal("createAdmin")}
          className="bg-blue-500 text-white px-4 cursor-pointer py-2 rounded"
        >
          + Create Admin
        </button>
        <button
          onClick={() => setRole("")}
          className="bg-red-400 text-white px-4 cursor-pointer py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="space-y-4">
      { loading && <h1 className="text-xl font-bold">Loading...</h1>}
        {admins.length > 0 &&
          admins.map((admin) => (
            <div key={admin.admin._id} className="border p-4 rounded-lg shadow">
              {/* ADMIN */}
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{admin.admin.name}</h3>

                <div className="flex gap-2">
                  <button
                    className="text-blue-500 cursor-pointer"
                    onClick={() =>
                      openModal("editAdmin", admin.admin, admin.admin._id)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="text-green-500 cursor-pointer"
                    onClick={() =>
                      openModal("createUser", null, admin.admin._id)
                    }
                  >
                    + User
                  </button>

                  <button
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(admin.admin._id, "admin")}
                  >
                    Delete
                  </button>
                </div>
              </div>


              <ul className="mt-3 ml-4 space-y-2">
                {admin.users?.map((user) => (
                  <li
                    key={user._id}
                    className="flex justify-between border p-2 rounded"
                  >
                    <span>{user.name}</span>

                    <div className="flex gap-2">
                      <button
                        className="text-blue-500 cursor-pointer"
                        onClick={() => openModal("editUser", user, user._id)}
                      >
                        Edit
                      </button>

                      <button
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDelete(user._id, "user")}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
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
