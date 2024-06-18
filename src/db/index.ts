export const saveUser = (user: {
  name: string;
  email: string;
  password: string;
}) => {
  const currentUsers = getUsers();
  const newUsers = [
    ...currentUsers,
    {
      ...user,
      role: "user",
      departmentId: null,
    },
  ];
  localStorage.setItem("users", JSON.stringify(newUsers));
};

export const getUsers = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

export const assignRole = (data: { role: string; userId: number }) => {
  const current = getUsers();
  const updated = current.map((item) => ({
    ...item,
    role: item.id === data.userId ? data.role : item.role,
  }));
  localStorage.setItem("users", JSON.stringify(updated));
  return updated;
};

export const signIn = (user: { email: string; password: string }) => {
  const users = getUsers() ?? [];
  const authUser = users.find(
    (item: any) => item.email === user.email && item.password === user.password,
  );
  if (authUser) localStorage.setItem("currentUser", JSON.stringify(authUser));
  return authUser ?? null;
};

export const getId = () => Math.floor(Math.random() * 100000);

export const addDepartment = (data: { name: string }) => {
  const current = getDepartments();
  const newDepartment = {
    id: getId(),
    employees: 0,
    name: data.name,
  };
  localStorage.setItem(
    "departments",
    JSON.stringify([...current, newDepartment]),
  );
  return newDepartment;
};

export const getDepartments = () => {
  const data = localStorage.getItem("departments");
  return data ? JSON.parse(data) : [];
};

export const assignDepartment = (data: {
  id: string | number | null;
  userId: string | number;
}) => {
  const users = getUsers() ?? [];
  const user = users.find((item) => (item.id = data.userId));
  if (user) {
    const updatedUsers = users.map((user) => ({
      ...user,
      departmentId: user.id === data.userId ? data.id : user.departmentId,
    }));
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return updatedUsers;
  } else {
    return null;
  }
};

export const getTasks = () => {
  const data = localStorage.getItem("tasks");
  const res = data ? JSON.parse(data) : [];
  return res.filter((item: any) => !item.completed);
};

export const addTask = (item: {
  title: string;
  body: string;
  userId: number;
  id: number;
}) => {
  const current = getTasks();
  const newItem = {
    ...item,
    completed: false,
    id: getId(),
  };
  localStorage.setItem("tasks", JSON.stringify([...current, newItem]));
  return [...current, newItem];
};

export const deleteTask = (id: number) => {
  const current = getTasks();
  const updated = current.filter((item: any) => item.id !== id);
  localStorage.setItem("tasks", JSON.stringify(updated));
  return updated.filter((item: any) => !item.completed);
};

export const completeTask = (id: number) => {
  const current = getTasks();
  const updated = current.map((item: any) => ({
    ...item,
    completed: item.id === id,
  }));
  localStorage.setItem("tasks", JSON.stringify(updated));
  return updated.filter((item: any) => !item.completed);
};

export const updateTask = (data: { id: number; title: string }) => {
  const current = getTasks();
  const updated = current.map((item: any) => ({
    ...item,
    title: item.id === data.id ? data.title : item.title,
  }));
  localStorage.setItem("tasks", JSON.stringify(updated));
  return updated;
};

export const assignTask = (data: { id: number; userId: number }) => {
  const current = getTasks();
  const updated = current.map((item: any) => ({
    ...item,
    userId: item.id === data.id ? data.userId : item.id,
  }));
  localStorage.setItem("tasks", JSON.stringify(updated));
  return updated;
};
