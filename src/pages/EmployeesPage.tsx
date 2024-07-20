import EmployeeList from '../components/employees/EmployeeList';
import React, { useState, useEffect } from 'react';
import { addEmployee, getEmployees, Employee } from '../services/employeeService';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
function EmployeesPage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [newEmployee, setNewEmployee] = useState<Employee>({
        staffId: '',
        name: '',
        joiningDate: '',
        basicSalary: '',
        salaryAllowances: '',
    });
    const [openModal, setOpenModal] = useState(false);
    useEffect(() => {
        setEmployees(getEmployees());
    }, []);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e)
        const { name, value } = e.target;
        setNewEmployee({ ...newEmployee, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addEmployee(newEmployee);
        setEmployees([...employees, newEmployee]);
        setNewEmployee({
            staffId: '',
            name: '',
            joiningDate: '',
            basicSalary: '',
            salaryAllowances: '',
        });
    };
    function onCloseModal() {
        setOpenModal(false);
    }
    return (
        <div className="EmployeesPage">
            <div className="flex items-center justify-between border-b pb-2 mb-4">
                <h1 className='text-primary text-2xl font-bold '>Employees Management</h1>
                <Button onClick={() => setOpenModal(true)} color='success'>Add new Employee</Button>
            </div>

            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
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

                            <div className="w-full">
                                <Button type="submit" color="success" className='w-100 block'>Add Employee</Button>
                            </div>

                        </div>
                    </form>
                </Modal.Body>
            </Modal>
         
            <EmployeeList employees={employees} />
        </div>
    );
}

export default EmployeesPage;