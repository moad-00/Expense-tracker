import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Main, { mainLoader } from './layouts/Main';

import { registerAction, loginAction } from './actions/auth';
import Dashboard, { dashboardAction, dashboardLoader } from './pages/DashboardLayout';
import BudgetPage, { BudgetLoader, budgetAction } from './pages/BudgetPage';
import ExpensesPage, { expensesAction, expensesLoader } from './pages/ExpensesPage';
import Error from './pages/Error';
import Register from './pages/Register';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: 'budget/:id',
        element: <BudgetPage />,
        loader: BudgetLoader,
        action: budgetAction,
        errorElement: <Error />,
      },
      {
        path: 'expenses',
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <Error />,
      },
    ],
  },
  { path: '/register', element: <Register />, action: registerAction, errorElement: <Error /> },
  { path: '/login', element: <Login />, action: loginAction, errorElement: <Error /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;