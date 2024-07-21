import SalariesList, { Employee } from '../components/salaries/SalariesList';
import React, { useState, useEffect } from 'react';
import { getEmployees } from '../services/employeeService';
import { Alert, Button, Label, Modal, TextInput, Checkbox } from 'flowbite-react';
import { HiInformationCircle } from "react-icons/hi";
import { processSalary } from '../services/salaryService';
import { HiDocumentText } from "react-icons/hi";

import { Link } from 'react-router-dom';
export interface SalaryProcessProps {
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
function SalariesPage() {

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [alert, setAlert] = useState({ message: '', type: '' });

    const [salaryData, setSalaryData] = useState<SalaryProcessProps>({
        staffId: '',
        name: '',
        joiningDate: '',
        basicSalary: 0,
        salaryAllowances: 0,
        additions: 0,
        deductions: 0,
        total: 0,
        salaryDate: '',
        endOfService: false
    });
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        getEmployeesWithAdditionalProps();
    }, []);
    const getEmployeesWithAdditionalProps = () => {
        let employees = getEmployees();

        employees = employees.map(employee => ({
            ...employee,
            additions: employee.additions || 0,
            deductions: employee.additions || 0,
        }));

        //@ts-ignore
        setEmployees(employees);
    };
    const handleSalaryPropsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setSalaryData({ ...salaryData, [name]: value });
    };
    const onCloseModal = () => {
        setOpenModal(false);
    }
    const openProccessSalary = (employee: SalaryProcessProps) => {
        setOpenModal(true);
        setSalaryData({...employee, salaryDate: '', endOfService: employee.endOfService || false});
    }
    const triggerProcessSalary = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        processSalary(salaryData);
        setAlert({ message: 'Salary processed successfully', type: 'success' });
        setOpenModal(false);
    };
    return (
        <div className="SalariesPage p-2">
            <div className="flex items-center justify-between border-b pb-2 mb-4">
                <h1 className='text-primary text-2xl font-bold '>Salaries Managment</h1>
                <Button color="warning">
                    <Link className='flex items-center' to="/payments-history">
                        <HiDocumentText className='w-5 h-5 me-2' />
                        Payments History
                    </Link>
                </Button>
            </div>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <form onSubmit={triggerProcessSalary}>
                        <div className="space-y-4">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white border-b pb-2">Proccess {salaryData.name}'s Salary</h3>
                            <div>
                                <div className="mb-1 block">
                                    <Label htmlFor="staffId" value="Staff ID" />
                                </div>
                                <TextInput
                                    disabled
                                    type="text"
                                    name="staffId"
                                    placeholder="Staff ID"
                                    value={salaryData.staffId}
                                    onChange={handleSalaryPropsChange}
                                />
                            </div>
                            <div>
                                <div className="mb-1 block">
                                    <Label htmlFor="Name" value="Name" />
                                </div>
                                <TextInput
                                    disabled
                                    id="Name"
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={salaryData.name}
                                    onChange={handleSalaryPropsChange}
                                />
                            </div>
                            <div>
                                <div className="mb-1 block">
                                    <Label htmlFor="Total" value="Total" />
                                </div>
                                <TextInput
                                    disabled
                                    id="Total"
                                    type="text"
                                    name="total"
                                    placeholder="Total"
                                    value={salaryData.total}
                                    onChange={handleSalaryPropsChange}
                                />
                            </div>
                            <div>
                                <div className="mb-1 block">
                                    <Label htmlFor="salaryDate" value="Salary Year/Month" />
                                </div>
                                <TextInput
                                    id="salaryDate"
                                    type="month"
                                    min="2024-01"
                                    max={`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`}
                                    name="salaryDate"
                                    placeholder="Salary Year/Mont"
                                    value={salaryData.salaryDate}
                                    onChange={handleSalaryPropsChange}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="endOfService" name="endOfService" onChange={handleSalaryPropsChange} checked={salaryData.endOfService} />
                                <Label htmlFor="endOfService" className="flex">
                                    end-of-service (gratuity)
                                </Label>
                            </div>
                            <div className="w-full">
                                <Button type="submit" color="success" className='w-100 block'>Process Salary</Button>
                            </div>
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
            <SalariesList salaries={employees} openProcessSalaryModal={openProccessSalary} />
        </div >
    );
}

export default SalariesPage;