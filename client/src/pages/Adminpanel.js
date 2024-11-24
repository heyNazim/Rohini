import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import FixedFooter from '../components/Footer';


const Adminpanel = () => {

    // Task states
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [assignedTo, setAssignedTo] = useState();
    const [userlist, setUserlist] = useState();
    const [tasklist, setTasklist] = useState();

    // User states
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [role, setRole] = useState();
    const [userid, setUserid] = useState('');


    // xxxxxx
    const [toggle, setToggle] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const openModal = (id) => {
        setUserid(id)
      setShowModal(true); // Open the modal
    };
  
    const closeModal = () => {
      setShowModal(false); // Close the modal
    };

    


    const fetchUserlist = async () => {
        try {
            // const result = await axios.get("http://localhost:8080/api/allusers")
            const result = await axios.get("http://16.170.230.119:8080/api/allusers");

            if (result.data.success) {
                console.log(result.data)
                setUserlist(result.data.allusers)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const fetchTasklist = async () => {
        try {
            // const result = await axios.get("http://localhost:8080/api/gettasklist")
            const result = await axios.get("http://16.170.230.119:8080/api/gettasklist");

            if (result.data.success) {
                console.log(result.data)
                setTasklist(result.data.tasks)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUserlist()
        fetchTasklist()
    }, [])

    const handleToggle = () => {
        setToggle((prevState) => !prevState);
      };

    const handleform = async (e) => {
        e.preventDefault();
        try {
            // const result = await axios.post("http://localhost:8080/api/createtask", { title, description, assignedTo })
            const result = await axios.post("http://16.170.230.119:8080/api/createtask", {
              title,
              description,
              assignedTo,
            });
            
            if (result.data.success) {
                alert("Task created successfully")
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Edit User
    const updateUser = async (e) => {
        e.preventDefault();
        try {
            // const result = await axios.put(`http://localhost:8080/api/updateuser/${userid}`, { name, email, role })
            const result = await axios.put(`http://16.170.230.119:8080/api/updateuser/${userid}`, {
              name,
              email,
              role,
            });
            
            if (result.data.success) {
                alert("User updated successfully")
                fetchUserlist(); 
            }
        } catch (error) {
            console.log(error)
        }
    }

      // Delete User
  const deleteUser = async (userid) => {
    try {
      // const response = await axios.delete(`http://localhost:8080/api/deleteuser/${userid}`)
      const response = await axios.delete(`http://16.170.230.119:8080/api/deleteuser/${userid}`);

      if (response) {
        alert(response?.data?.message)
        fetchUserlist();  
      }
    } catch (error) {
      console.log(error)
    }
  }
      // Delete Task
  const deleteTask = async (userid) => {
    try {
      // const response = await axios.delete(`http://localhost:8080/api/deletetask/${userid}`)
      const response = await axios.delete(`http://16.170.230.119:8080/api/deletetask/${userid}`);

      if (response) {
        alert(response?.data?.message)
        fetchUserlist();  // Re-fetch the user list after successful update
      }
    } catch (error) {
      console.log(error)
    }
  }


    return (
        <>



           <Header/>
           <div className="App">

      {showModal && (
          <div className="modal-overlay">
          <div className="modal-content">

            <h2>Edit User</h2>
            <form onSubmit={updateUser}>
                <input  onChange={(e)=>setName(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 mb-1" placeholder=' Name' type="text" />
                <input  onChange={(e)=>setEmail(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 mb-1" placeholder=' Email' type="text" />
                <input  onChange={(e)=>setRole(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 mb-1" placeholder=' Role' type="text" />
                <button type='submit'>Update User</button>
            </form>

          </div>
          <button onClick={closeModal}>x</button>
        </div>
      )}
    </div>
    
           <button  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleToggle}>Add User / Assign  Task</button>
           {
            toggle?    <div className="min-h-full">

            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Adminpanel</h1>

                <div className="flex min-h-full flex-col justify-center px-2 py-1 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create Task</h2>
                    </div>
                    <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleform} className="space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">Task Title</label>
                                <div className="mt-1">
                                    <input onChange={(e) => setTitle(e.target.value)} id="title" name="title" type="text" autoComplete="title" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">Task Description</label>
                                </div>
                                <div className="mt-1">
                                    <input onChange={(e) => setDescription(e.target.value)} id="description" name="description" type="text" autoComplete="current-description" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="userlist" className="block text-sm/6 font-medium text-gray-900">
                                    User List
                                </label>
                                <div className="mt-1">
                                    <select onChange={(e) => setAssignedTo(e.target.value)} id="userlist" name="userlist" autoComplete="userlist-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6" >
                                        {userlist?.map((user) => (
                                            <option key={user.id} value={user._id}>
                                                {user.email}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Task Assign To User</button>
                            </div>
                        </form>

                    </div>
                </div>

            </div>
        <main>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{/* Your content */}</div>
        </main>
    </div> :  <div>
      {/* ==================== User list===================================================== */} <br /><hr /><hr /><hr />

      <h1>User Crud</h1>
    <table>
  <thead>
    <tr>
      <th>S.no</th>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    {userlist && userlist.length > 0 ? (
      userlist.map((val, index) => (
        <tr key={index + 1}>
          <td>{index + 1}</td>
          <td>{val._id}</td>
          <td>{val.name || "No Name Provided"}</td>
          <td>{val.email || "No Email Provided"}</td>
          <td>{val.role || "No role provided"}</td>
          <td> <button onClick={() => openModal(val._id)}>
        Update
      </button></td>
          <td><button onClick={() => deleteUser(val._id)}>Delete</button></td>
          <td>  </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="4" style={{ textAlign: "center", padding: "1rem", fontStyle: "italic" }}>
          No data available
        </td>
      </tr>
    )}
  </tbody>
</table>
{/* ==================== Task list===================================================== */} <br /><br /><hr /><hr /><hr />
      <h1>Task List Crud</h1>
    <table>
  <thead>
    <tr>
      <th>S.no</th>
      <th>ID</th>
      <th>Title</th>
      <th>assignedTo</th>
      <th>status</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    {tasklist && tasklist.length > 0 ? (
      tasklist.map((val, index) => (
        <tr key={index + 1}>
          <td>{index + 1}</td>
          <td>{val._id}</td>
          <td>{val.title || "No Title Provided"}</td>
          <td>{val.description || "No Description Provided"}</td>
          <td>{val.status || "No Status provided"}</td>
          <td> <button onClick={() => openModal(val._id)}>
        Update
      </button></td>
          <td><button onClick={() => deleteTask(val._id)}>Delete</button></td>
          <td>  </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="4" style={{ textAlign: "center", padding: "1rem", fontStyle: "italic" }}>
          No data available
        </td>
      </tr>
    )}
  </tbody>
</table>

    </div>
           }
          

<FixedFooter/>
        </>
    )
}

export default Adminpanel