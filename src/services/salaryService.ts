interface SalaryProcessProps {
    staffId: string;
    name: string;
    joiningDate: string;
    basicSalary: number;
    salaryAllowances: number;
    additions: number;
    deductions: number;
    total?: number;
    salaryDate?: string;
    endOfService?: boolean;
}
export const processSalary = (salaryData: SalaryProcessProps) => {

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

    const userIndex = users.findIndex((user: any) => user.email === currentUser.email);
    if (userIndex !== -1) {
        const user = users[userIndex];
        user.salariesLog = user.salariesLog || [];
        user.salariesLog.push(salaryData);
        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));
    }
    currentUser.salariesLog = currentUser.salariesLog || [];
    currentUser.salariesLog.push(salaryData);
    localStorage.setItem('user', JSON.stringify(currentUser));
};
export const getUserSalariesLog = () => {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    return currentUser.salariesLog || [];
};