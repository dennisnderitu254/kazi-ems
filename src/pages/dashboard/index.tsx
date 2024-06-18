import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context";
import {
  addDepartment,
  addTask,
  assignDepartment,
  assignRole,
  assignTask,
  completeTask,
  deleteTask,
  getDepartments,
  getTasks,
  getUsers,
  updateTask,
} from "../../db";
import { toast } from "react-toastify";
import axios from "axios";

export const Dashboard = () => {
  const { setUser, user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("tasks");
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [employees, setEmployees] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const users = getUsers();
    setEmployees(users);
    const departments = getDepartments();
    setDepartments(departments);
    const tasks = getTasks();
    setTasks(tasks);
  }, []);

  const handleAddDepartment = (event: any) => {
    event.preventDefault();
    const { name } = event.target.elements;
    const res = addDepartment({
      name: name.value,
    });
    setDepartments((prev) => [...prev, res]);
  };

  const handleAssignDepart = (event: any) => {
    event.preventDefault();
    const value = event?.target?.value;
    const res = assignDepartment({
      id: value && value !== "" ? Number(value) : null,
      userId: user.id,
    });
    if (res) {
      setEmployees(res);
    } else {
      toast.error("Soory, update failed!");
    }
  };

  const handleAssignTask = (event: any) => {
    event.preventDefault();
    const value = event?.target?.value;
    const res = assignTask({
      id: selectedTask?.id,
      userId: value && value !== "" ? Number(value) : null,
    });
    console.log(res);
    if (res) {
      setTasks(res);
    } else {
      toast.error("Soory, update failed!");
    }
  };

  const handleAddTask = async (event: any) => {
    event.preventDefault();
    try {
      const { title } = event.target.elements;

      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title: title.value ?? "",
          body: "",
          userId: null,
        },
      );
      const tasks = addTask(res.data);
      setTasks(tasks);
      event.target?.reset();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const handleTaskUpdate = (event: any) => {
    event.preventDefault();
    const value = event?.target?.value;
    const res = updateTask({
      id: selectedTask?.id,
      title: value,
    });
    setTasks(res);
  };

  const handleAssignRole = (data: { role: string; userId: number }) => {
    const res = assignRole(data);
    setEmployees(res);
  };

  return (
    <main>
      <section className="dashboard">
        <header>
          <div className="dashboard-title">Kazi HQ</div>
          <div className="dashboard-user">
            <div className="dashboard-user-name">{user ? user.name : ""}</div>
            <div
              onClick={() => {
                setUser(null);
                localStorage.removeItem("currentUser");
              }}
              className="link"
            >
              Signout
            </div>
          </div>
        </header>
        <div className="tabs">
          {[
            {
              id: "tasks",
              label: "Tasks",
            },
            {
              id: "employees",
              label: "Employees",
            },
            {
              id: "departments",
              label: "Departments",
            },
          ].map((item: { id: string; label: string }) => (
            <div
              onClick={() => setActiveTab(item.id)}
              className={`tab ${activeTab === item.id ? "tab-active" : ""}`}
              key={item.id}
            >
              {item.label}
            </div>
          ))}
        </div>
        <div className="dashboard-content">
          {activeTab === "tasks" ? (
            <div>
              {user && (user.role === "manager" || user.role === "admin") ? (
                <form className="departments-add" onSubmit={handleAddTask}>
                  <textarea name="title" placeholder="Task title"></textarea>
                  <button>Add</button>
                </form>
              ) : null}
              <div className="tasks">
                {tasks.map(
                  (item: {
                    userId: number;
                    departmentId: number;
                    id: number;
                    title: string;
                    completed: boolean;
                  }) => (
                    <div key={item.id} className="task">
                      {selectedTask && selectedTask.id === item.id ? (
                        <textarea
                          onChange={handleTaskUpdate}
                          defaultValue={selectedTask.title}
                        ></textarea>
                      ) : (
                        <div
                          onClick={() => setSelectedTask(item)}
                          className="task-title"
                        >
                          {item.title}
                        </div>
                      )}
                      <div className="task-footer">
                        <select
                          onClick={() => setSelectedTask(item)}
                          onChange={handleAssignTask}
                          defaultValue={item.userId}
                        >
                          <option value="">Assign</option>
                          {employees.map((userItem: any) => (
                            <option key={userItem.id} value={userItem.id}>
                              {userItem.name}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => {
                            const res = completeTask(item.id);
                            setTasks(res);
                          }}
                          className="task-btn"
                        >
                          Done
                        </button>
                        <button
                          onClick={() => {
                            const res = deleteTask(item.id);
                            setTasks(res);
                            setSelectedTask(null);
                          }}
                          className="task-btn task-btn-delete"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ),
                )}
              </div>{" "}
            </div>
          ) : activeTab === "departments" ? (
            <div className="departments">
              {user && (user.role === "manager" || user.role === "admin") ? (
                <form
                  className="departments-add"
                  onSubmit={handleAddDepartment}
                >
                  <input name="name" placeholder="Department name" />{" "}
                  <button>Add</button>
                </form>
              ) : null}
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Employees</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((item: any) => (
                    <tr className="row" key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.employees}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="employees">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Department</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((item: any) => (
                    <tr className="row" key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>
                        {" "}
                        <select
                          disabled={user && user.role === "user"}
                          defaultValue={item.role}
                          onChange={(event: any) => {
                            event.preventDefault();
                            const role = event.target.value;
                            handleAssignRole({
                              role: role ?? "user",
                              userId: item.id,
                            });
                          }}
                        >
                          {[
                            {
                              id: "user",
                              name: "User",
                            },
                            {
                              id: "manager",
                              name: "Manager",
                            },
                            {
                              id: "admin",
                              name: "Admin",
                            },
                          ].map((role: any) => (
                            <option key={role.id} value={role.id}>
                              {role.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          disabled={user && user.role === "user"}
                          defaultValue={item.departmentId}
                          onChange={handleAssignDepart}
                        >
                          <option value="">Assign Department</option>
                          {departments.map((depart: any) => (
                            <option key={depart.id} value={depart.id}>
                              {depart.name}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
