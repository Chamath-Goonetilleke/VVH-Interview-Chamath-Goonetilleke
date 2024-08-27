import './App.css';
import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import NavBar from './components/navBar';
import TasksPage from './pages/TasksPage';

function App() {
  return (
    <Fragment>
      <NavBar />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Routes>
    </Fragment>
  );
}

export default App;
