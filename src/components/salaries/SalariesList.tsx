import { Button, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiCash } from "react-icons/hi";

export interface Employee {
    staffId: string;
    name: string;
    joiningDate: string;
    basicSalary: number;
    salaryAllowances: number;
    additions: number;
    deductions: number;
    total?: number;
}

interface SalariesProps {
    salaries: Employee[];
    openProcessSalaryModal: (employee: Employee) => void;
}

function SalariesList({ salaries, openProcessSalaryModal }: SalariesProps) {
    useEffect(() => {
        setEmployeesSalaries(salaries);
    }, [salaries]);
    const [employeesSalaries, setEmployeesSalaries] = useState(salaries);
    const handleAdditionsChange = (index: number, value: number) => {
        const newSalaries = [...employeesSalaries];
        newSalaries[index].additions = value;
        setEmployeesSalaries(newSalaries);
    };

    const handleDeductionsChange = (index: number, value: number) => {
        const newSalaries = [...employeesSalaries];
        newSalaries[index].deductions = value;
        setEmployeesSalaries(newSalaries);
    };
    const triggerProcessSalaryModal = (employee: Employee) => {
        openProcessSalaryModal(employee);
    }
    return (
        <div className="Salaries">
            <div className="overflow-x-auto">
                {employeesSalaries.length === 0 ? (
                    <div className="flex flex-col items-center">
                        <span className="block mt-1 text-slate-500">
                            No salaries added yet.
                        </span>
                    </div>
                ) : (
                    <Table striped>
                        <Table.Head>
                            <Table.HeadCell>Staff ID</Table.HeadCell>
                            <Table.HeadCell>Name</Table.HeadCell>
                            <Table.HeadCell>Joining Date</Table.HeadCell>
                            <Table.HeadCell>Basic Salary</Table.HeadCell>
                            <Table.HeadCell>Salary Allowances</Table.HeadCell>
                            <Table.HeadCell>Additions</Table.HeadCell>
                            <Table.HeadCell>Deductions</Table.HeadCell>
                            <Table.HeadCell>Total</Table.HeadCell>
                            <Table.HeadCell>Actions</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {employeesSalaries.map((employee, index) => (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={employee.staffId}>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {employee.staffId}
                                    </Table.Cell>
                                    <Table.Cell>{employee.name}</Table.Cell>
                                    <Table.Cell>{employee.joiningDate}</Table.Cell>
                                    <Table.Cell>{employee.basicSalary}</Table.Cell>
                                    <Table.Cell>{employee.salaryAllowances}</Table.Cell>
                                    <Table.Cell>
                                        <TextInput
                                            className="w-24"
                                            type="string"
                                            value={employee.additions}
                                            onChange={(e) => handleAdditionsChange(index, Number(e.target.value))}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <TextInput
                                            className="w-24"
                                            type="string"
                                            value={employee.deductions}
                                            onChange={(e: any) => handleDeductionsChange(index, Number(e.target.value))}
                                        />

                                    </Table.Cell>
                                    <Table.Cell>
                                        {Number(employee.basicSalary) + Number(employee.salaryAllowances) + Number(employee.additions) - Number(employee.deductions)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button color="success" onClick={() => triggerProcessSalaryModal({...employee, total: Number(employee.basicSalary) + Number(employee.salaryAllowances) + Number(employee.additions) - Number(employee.deductions)})}>
                                            <HiCash className="mr-1 h-5 w-5" />
                                            Process Salary
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                )}
            </div>
        </div>
    );
}

export default SalariesList;