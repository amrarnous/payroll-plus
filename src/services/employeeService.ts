export interface Employee {
    staffId: string;
    name: string;
    joiningDate: string;
    basicSalary: number;
    salaryAllowances: number;
    additions?: number;
    deductions?: number;
}

export const addEmployee = (newEmployee: Employee) => {
    // Get the existing users
    let users: any = localStorage.getItem('users');
    let currentUser: any = localStorage.getItem('user');

    users = users ? JSON.parse(users) : [];
    currentUser = currentUser ? JSON.parse(currentUser) : '';

    // @ts-ignore
    let userIndex = users.findIndex((user: any) => user.email === currentUser.email);

    // If the user exists
    if (userIndex !== -1) {
        if (users[userIndex].employees && users[userIndex].employees.some((employee: Employee) => employee.staffId === newEmployee.staffId)) {
            console.error(`An employee with staffId ${newEmployee.staffId} already exists.`);
            return;
        }

        if (!users[userIndex].employees) {
            users[userIndex] = { ...users[userIndex], employees: [] }
        }
        users[userIndex].employees.push(newEmployee);

        localStorage.setItem('users', JSON.stringify(users));

        localStorage.setItem('user', JSON.stringify(users[userIndex]));
    } else {
        console.error(`User with email ${currentUser} does not exist.`);
    }
};

export const getEmployees = (): Employee[] => {
    let existing: any = localStorage.getItem('user');
    existing = existing ? JSON.parse(existing) : []

    return existing.employees || [];
};

export const updateEmployee = (updatedEmployee: Employee) => {
    let users: any = localStorage.getItem('users');
    let currentUser: any = localStorage.getItem('user');

    users = users ? JSON.parse(users) : [];
    currentUser = currentUser ? JSON.parse(currentUser) : '';

    // @ts-ignore
    let userIndex = users.findIndex((user: any) => user.email === currentUser.email);

    if (userIndex !== -1) {
        let employeeIndex = users[userIndex].employees.findIndex((employee: Employee) => employee.staffId === updatedEmployee.staffId);

        if (employeeIndex !== -1) {
            users[userIndex].employees[employeeIndex] = updatedEmployee;

            localStorage.setItem('users', JSON.stringify(users));

            localStorage.setItem('user', JSON.stringify(users[userIndex]));
        } else {
            console.error(`Employee with staffId ${updatedEmployee.staffId} does not exist.`);
        }
    } else {
        console.error(`User with email ${currentUser} does not exist.`);
    }
};
export const deleteEmployee = (staffId: string) => {
    let users: any = localStorage.getItem('users');
    let currentUser: any = localStorage.getItem('user');

    users = users ? JSON.parse(users) : [];
    currentUser = currentUser ? JSON.parse(currentUser) : '';

    // @ts-ignore
    let userIndex = users.findIndex((user: any) => user.email === currentUser.email);

    if (userIndex !== -1) {
        let employeeIndex = users[userIndex].employees.findIndex((employee: Employee) => employee.staffId === staffId);

        if (employeeIndex !== -1) {
            users[userIndex].employees.splice(employeeIndex, 1);

            localStorage.setItem('users', JSON.stringify(users));

            localStorage.setItem('user', JSON.stringify(users[userIndex]));
        } else {
            console.error(`Employee with staffId ${staffId} does not exist.`);
        }
    } else {
        console.error(`User with email ${currentUser} does not exist.`);
    }
};