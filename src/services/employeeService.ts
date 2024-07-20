export interface Employee {
    staffId: string;
    name: string;
    joiningDate: string;
    basicSalary: string;
    salaryAllowances: string;
}

export const addEmployee = (newEmployee: Employee) => {
    // Get the existing data
    let existing = localStorage.getItem('employees');

    // If no existing data, create an array
    // Otherwise, convert the localStorage string to an array
    existing = existing ? JSON.parse(existing) : [];

    // Add new data to localStorage Array
    // @ts-ignore
    existing.push(newEmployee);

    // Save back to localStorage
    localStorage.setItem('employees', JSON.stringify(existing));
};

export const getEmployees = (): Employee[] => {
    // Get the existing data
    let existing = localStorage.getItem('employees');

    // If no existing data, return an empty array
    // Otherwise, convert the localStorage string to an array and return it
    return existing ? JSON.parse(existing) : [];
};