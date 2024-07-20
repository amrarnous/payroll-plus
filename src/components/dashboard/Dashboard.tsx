import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="Dashboard">
      <h1>PayrollPro Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="/employees">Employees</Link></li>
          <li><Link to="/salaries">Salaries</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Dashboard;