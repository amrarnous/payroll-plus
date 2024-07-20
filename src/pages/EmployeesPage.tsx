import EmployeeList from '../components/employees/EmployeeList';
import React, { useState, useEffect } from 'react';
import { addEmployee, getEmployees, Employee, updateEmployee } from '../services/employeeService';
import { Alert, Button, Label, Modal, TextInput } from 'flowbite-react';
import { HiInformationCircle } from "react-icons/hi";

function EmployeesPage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [alert, setAlert] = useState({ message: '', type: '' });
    const [newEmployee, setNewEmployee] = useState<Employee>({
        staffId: '',
        name: '',
        joiningDate: '',
        basicSalary: '',
        salaryAllowances: '',
    });
    const [openModal, setOpenModal] = useState({ show: false, mode: 'add' });
    useEffect(() => {
        setEmployees(getEmployees());
    }, []);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewEmployee({ ...newEmployee, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (employees.some((employee: Employee) => employee.staffId === newEmployee.staffId)) {
            setAlert({ message: `An employee with staffId ${newEmployee.staffId} already exists.`, type: 'failure' });
            setTimeout(() => {
                setAlert({ message: '', type: '' });
            }, 1500)
            return;
        }
        addEmployee(newEmployee);
        setEmployees([...employees, newEmployee]);
        setNewEmployee({
            staffId: '',
            name: '',
            joiningDate: '',
            basicSalary: '',
            salaryAllowances: '',
        });
        setAlert({ message: `An employee was added successfully`, type: 'success' });
        setTimeout(() => {
            setAlert({ message: '', type: '' });
        }, 1500)
    };
    const updateEmployeeInfo = () => {
        updateEmployee(newEmployee);
        setEmployees([...employees.map((employee) => employee.staffId === newEmployee.staffId ? newEmployee : employee)]);
        setNewEmployee({
            staffId: '',
            name: '',
            joiningDate: '',
            basicSalary: '',
            salaryAllowances: '',
        });
        setAlert({ message: `Employee information was updated successfully`, type: 'success' });
        setTimeout(() => {
            setAlert({ message: '', type: '' });
            setOpenModal({ show: false, mode: '' });
        }, 1500)
    }
    const onCloseModal = () => {
        setOpenModal({ show: false, mode: '' });
    }
    const handleEmployeeUpdate = (employee: Employee) => {
        setNewEmployee(employee);
        setOpenModal({ show: true, mode: 'edit' });
    }
    return (
        <div className="EmployeesPage">
            <div className="flex items-center justify-between border-b pb-2 mb-4">
                <h1 className='text-primary text-2xl font-bold '>Employees Management</h1>
                <Button onClick={() => setOpenModal({ show: true, mode: 'add' })} color='success'>Add new Employee</Button>
            </div>

            <Modal show={openModal.show} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white border-b pb-2">Add new employee</h3>
                            <div>
                                <div className="mb-1 block">
                                    <Label htmlFor="staffId" value="Staff ID" />
                                </div>
                                <TextInput
                                    type="text"
                                    name="staffId"
                                    placeholder="Staff ID"
                                    disabled={openModal.mode == 'edit'}
                                    value={newEmployee.staffId}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <div className="mb-1 block">
                                    <Label htmlFor="Name" value="Name" />
                                </div>
                                <TextInput
                                    id="Name"
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={newEmployee.name}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <div className="mb-1 block">
                                    <Label htmlFor="joiningDate" value="joining Date" />
                                </div>
                                <TextInput
                                    id="joiningDate"
                                    type="date"
                                    name="joiningDate"
                                    placeholder="joining date"
                                    value={newEmployee.joiningDate}
                                    onChange={handleInputChange}
                                />


                            </div>


                            <div>
                                <div className="mb-1 block">
                                    <Label htmlFor="bsSalary" value="Basic Salary" />
                                </div>
                                <TextInput
                                    id="bsSalary"
                                    type="number"
                                    name="basicSalary"
                                    placeholder="Basic Salary"
                                    value={newEmployee.basicSalary}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <div className="mb-1 block">
                                    <Label htmlFor="salaryAllowances" value="salary Allowances" />
                                </div>
                                <TextInput
                                    id="salaryAllowances"
                                    type="number"
                                    name="salaryAllowances"
                                    placeholder="Salary Allowances"
                                    value={newEmployee.salaryAllowances}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {openModal.mode == 'add' && (
                                <div className="w-full">
                                    <Button type="submit" color="success" className='w-100 block'>Add Employee</Button>
                                </div>
                            )}
                            {openModal.mode == 'edit' && (
                                <div className="w-full">
                                    <Button color="warning" onClick={updateEmployeeInfo} className='w-100 block'>Update Employee</Button>
                                </div>
                            )}

                            {alert.type == 'failure' && (
                                <Alert color="failure" icon={HiInformationCircle}>
                                    <span className="font-medium">{alert.message}</span>
                                </Alert>
                            )}
                            {alert.type == 'success' && (
                                <Alert color="success" icon={HiInformationCircle}>
                                    <span className="font-medium">{alert.message}</span>
                                </Alert>
                            )}

                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <EmployeeList employees={employees} onEdit={handleEmployeeUpdate} />
        </div>
    );
}

export default EmployeesPage;