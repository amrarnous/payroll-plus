export interface Employee {
    staffId: string;
    name: string;
    joiningDate: string;
    basicSalary: string;
    salaryAllowances: string;
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
    // Get the existing users
    let users: any = localStorage.getItem('users');
    let currentUser: any = localStorage.getItem('user');

    users = users ? JSON.parse(users) : [];
    currentUser = currentUser ? JSON.parse(currentUser) : '';

    // @ts-ignore
    let userIndex = users.findIndex((user: any) => user.email === currentUser.email);

    // If the user exists
    if (userIndex !== -1) {
        // Find the index of the employee with the same staffId
        let employeeIndex = users[userIndex].employees.findIndex((employee: Employee) => employee.staffId === updatedEmployee.staffId);

        // If the employee exists
        if (employeeIndex !== -1) {
            // Update the employee's data
            users[userIndex].employees[employeeIndex] = updatedEmployee;

            // Save the updated users back to localStorage
            localStorage.setItem('users', JSON.stringify(users));

            // Also save the updated user to the 'user' key in localStorage
            localStorage.setItem('user', JSON.stringify(users[userIndex]));
        } else {
            // Handle the case when the employee does not exist
            console.error(`Employee with staffId ${updatedEmployee.staffId} does not exist.`);
        }
    } else {
        // Handle the case when the user does not exist
        console.error(`User with email ${currentUser} does not exist.`);
    }
};