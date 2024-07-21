import EmployeeList from '../components/employees/EmployeeList';
import React, { useState, useEffect } from 'react';
import { addEmployee, getEmployees, Employee, updateEmployee, deleteEmployee } from '../services/employeeService';
import { Alert, Button, Label, Modal, TextInput } from 'flowbite-react';
import { HiInformationCircle, HiOutlineExclamationCircle, HiUserAdd } from "react-icons/hi";

function EmployeesPage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [alert, setAlert] = useState({ message: '', type: '' });
    const [newEmployee, setNewEmployee] = useState<Employee>({
        staffId: '',
        name: '',
        joiningDate: '',
        basicSalary: 0,
        salaryAllowances: 0,
    });
    const [openModal, setOpenModal] = useState({ show: false, mode: 'add' });
    const [openDeleteionModal, setOpenDeleteionModal] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState<Employee>({
        staffId: '',
        name: '',
        joiningDate: '',
        basicSalary: 0,
        salaryAllowances: 0,
    });
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
            basicSalary: 0,
            salaryAllowances: 0,
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
            basicSalary: 0,
            salaryAllowances: 0,
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
    const showDeleteEmployeeModal = (employee: Employee) => {
        setOpenDeleteionModal(true);
        setEmployeeToDelete(employee);
    }
    const handleDeleteEmployee = () => {
        deleteEmployee(employeeToDelete.staffId);
        setEmployees([...employees.filter((employee) => employee.staffId !== employeeToDelete.staffId)]);
        setOpenDeleteionModal(false);
    }
    return (
        <div className="EmployeesPage p-2">
            <div className="flex items-center justify-between border-b pb-2 mb-4">
                <h1 className='text-primary text-2xl font-bold '>Employees Management</h1>
                <Button onClick={() => setOpenModal({ show: true, mode: 'add' })} className='flex items-center' color='success'>
                        <HiUserAdd className='w-5 h-5 me-2' />
                        Add New Employee
                </Button>
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
            <Modal show={openDeleteionModal} size="md" onClose={() => setOpenDeleteionModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this Employee?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => handleDeleteEmployee()}>
                                Yes, I'm sure
                            </Button>
                            <Button color="gray" onClick={() => setOpenDeleteionModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <EmployeeList employees={employees} onEdit={handleEmployeeUpdate} onDelete={showDeleteEmployeeModal} />
        </div>
    );
}

export default EmployeesPage;