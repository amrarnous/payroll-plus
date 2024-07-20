import React, { useState } from 'react';

function Salaries() {
  const [salaries, setSalaries] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  // Assume we have a list of employees from the Employees component
  const employees = [
    { staffId: '001', name: 'John Doe', basicSalary: 5000, salaryAllowances: 1000 },
    { staffId: '002', name: 'Jane Smith', basicSalary: 5500, salaryAllowances: 1200 },
  ];

  const processSalaries = () => {
    const processedSalaries: any = employees.map(employee => ({
      ...employee,
      additions: 0,
      deductions: 0,
      totalSalary: employee.basicSalary + employee.salaryAllowances,
      isEndOfService: false
    }));
    setSalaries(processedSalaries);
  };

  const handleAdditionDeduction = (index: any, type: any, value: any) => {
    const updatedSalaries: any = [...salaries];
    updatedSalaries[index][type] = parseFloat(value);
    updatedSalaries[index].totalSalary = 
      updatedSalaries[index].basicSalary + 
      updatedSalaries[index].salaryAllowances + 
      updatedSalaries[index].additions - 
      updatedSalaries[index].deductions;
    setSalaries(updatedSalaries);
  };

  const toggleEndOfService = (index: any) => {
    const updatedSalaries: any = [...salaries];
    updatedSalaries[index].isEndOfService = !updatedSalaries[index].isEndOfService;
    setSalaries(updatedSalaries);
  };

  return (
    <div className="Salaries">
      <h2 className=''>Process Salaries</h2>
      <div>
        <input
          type="month"
          value={`${year}-${month}`}
          onChange={(e) => {
            const [yearVal, monthVal] = e.target.value.split('-');
            setYear(yearVal);
            setMonth(monthVal);
          }}
        />
        <button onClick={processSalaries}>Process Salaries</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Staff ID</th>
            <th>Name</th>
            <th>Basic Salary</th>
            <th>Allowances</th>
            <th>Additions</th>
            <th>Deductions</th>
            <th>Total Salary</th>
            <th>End of Service</th>
          </tr>
        </thead>
        <tbody>
          {salaries.map((salary: any, index) => (
            <tr key={index}>
              <td>{salary.staffId}</td>
              <td>{salary.name}</td>
              <td>{salary.basicSalary}</td>
              <td>{salary.salaryAllowances}</td>
              <td>
                <input
                  type="number"
                  value={salary.additions}
                  onChange={(e) => handleAdditionDeduction(index, 'additions', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={salary.deductions}
                  onChange={(e) => handleAdditionDeduction(index, 'deductions', e.target.value)}
                />
              </td>
              <td>{salary.totalSalary}</td>
              <td>
                <input
                  type="checkbox"
                  checked={salary.isEndOfService}
                  onChange={() => toggleEndOfService(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Salaries;