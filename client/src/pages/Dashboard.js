import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import FixedFooter from '../components/Footer';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);  

  const [status, setStatus] = useState();

  useEffect(() => {
    gettask();
  }, []);

  const gettask = async () => {
    try {
      const userid = localStorage.getItem("userId");
      const result = await axios.get("http://localhost:8080/api/allusertasks", {
        headers: {
          userid: userid
        }
      });

      if (result.data.success) {
        setTasks(result.data.alltask);
      }
    } catch (error) {
      console.log(error);
    }
  };


   // Edit User
   const updateTaskStatus = async (taskId, e) => {
    e.preventDefault();
    try {
      const result = await axios.put(`http://localhost:8080/api/usertaskstatus/${taskId}`, { status });
      if (result.data.success) {
        alert("Task updated successfully");
        gettask();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-full">
      <Header />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        </div>
      </header>
  
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="box">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div key={task._id}>
                  <p><b>Status:</b> {task.status}</p>
                  <p>{task.title}</p>
                  <p>{task.description}</p>
                                    <form className='text-center' onSubmit={(e) => updateTaskStatus(task._id, e)}>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      id="taskstatus"
                      name="taskstatus"
                      className="block w-full text-center m-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Progress">Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <button  type="submit">Update Task</button>
                  </form>
                  <br />
                </div>
              ))
            ) : (
              <p>No tasks available</p>
            )}
          </div>
        </div>
      </main>
      
      <FixedFooter />
    </div>
  
  );
};

export default Dashboard;
