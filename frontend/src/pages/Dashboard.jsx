import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const { state } = useLocation();
  const role = state?.role || 'student';
  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Welcome, {role.toUpperCase()}</h2>
        {role === 'hod' && <p>Go to HOD View</p>}
        {role === 'faculty' && <p>Go to Faculty View</p>}
        {role === 'student' && <p>Go to Student View</p>}
      </div>
    </>
  );
};
export default Dashboard;
