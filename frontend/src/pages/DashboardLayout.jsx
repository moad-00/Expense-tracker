import { Link, useLoaderData, redirect } from "react-router-dom";
import { fetchData, wait } from "../helpers";
import { toast } from "react-toastify";

import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
import Intro from "../components/Intro";

const API_BASE_URL = "https://rosy-marilee-hyperpathetical.ngrok-free.dev/api";

// Loader: fetch budgets (tasks) + expenses if authenticated
export async function dashboardLoader() {
  const userName = fetchData("userName");
  const authToken = fetchData("authToken");

  if (!authToken && userName) {
    localStorage.removeItem("userName");
  }

  let apiTasks = [];
  let apiExpenses = [];

  if (authToken) {
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${authToken}`,
      "ngrok-skip-browser-warning": "true",
    };

    try {
      const [tasksRes, expensesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/tasks`, { headers }),
        fetch(`${API_BASE_URL}/expenses`, { headers }),
      ]);

      if (tasksRes.ok) {
        const tasks = await tasksRes.json();
        apiTasks = tasks.map((t, i) => ({
          id: t.id,
          name: t.name ?? t.title ?? "Untitled",
          amount: Number(t.amount ?? t.budget_amount ?? 0),
          color: `${i * 34} 65% 50%`,
        }));
      }

      if (expensesRes.ok) {
        apiExpenses = await expensesRes.json();
      }
    } catch (err) {
      console.error("dashboardLoader error:", err);
    }
  }

  const totals = apiExpenses.reduce((acc, e) => {
    const id = e.task_id ?? e.task?.id;
    if (!id) return acc;
    acc[id] = (acc[id] || 0) + Number(e.amount);
    return acc;
  }, {});

  const tasksWithSpent = apiTasks.map((b) => ({
    ...b,
    spent: totals[b.id] || 0,
  }));

  return {
    userName: authToken ? userName : null,
    expenses: apiExpenses,
    apiTasks: tasksWithSpent,
    authToken,
  };
}

// Action: create, update budgets & create/delete expenses
export async function dashboardAction({ request }) {
  await wait();
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);
  const authToken = fetchData("authToken");
  if (!authToken) throw new Error("Session expired.");

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${authToken}`,
    "ngrok-skip-browser-warning": "true",
  };

  // Create Budget
  if (_action === "CreateBudget") {
    const payload = {
      name: values.newBudget?.trim(),
      amount: Number(values.newBudgetAmount),
    };
    if (!payload.name || isNaN(payload.amount)) {
      throw new Error("Please provide a valid name and amount.");
    }
    const res = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("Create budget failed:", res.status, text);
      throw new Error(text || "Failed to create budget");
    }
    toast.success(`Budget "${payload.name}" created!`);
    return redirect("/");
  }

  // Update Budget
  if (_action === "updateBudget") {
    const id = values.budgetId;
    const payload = {
      name: values.updateBudgetName?.trim(),
      amount: Number(values.updateBudgetAmount),
    };
    if (!id) throw new Error("Missing budget ID.");
    if (!payload.name || isNaN(payload.amount)) {
      throw new Error("Please provide a valid name and amount.");
    }

    // Try PATCH first, fallback to PUT
    let res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(payload),
    });

    if (res.status === 405) {
      res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(payload),
      });
    }

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("Update budget failed:", res.status, text);
      throw new Error(text || "Failed to update budget");
    }

    toast.success("Budget updated!");
    return redirect("/");
  }

  // Create Expense
  if (_action === "createExpense") {
    const payload = {
      name: values.newExpense?.trim(),
      amount: Number(values.newExpenseAmount),
      budgetId: values.newExpenseBudget,
    };
    if (!payload.name || isNaN(payload.amount) || !payload.budgetId) {
      throw new Error("Please fill in expense name, amount, and budget.");
    }
    const res = await fetch(`${API_BASE_URL}/expenses`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("Create expense failed:", res.status, text);
      throw new Error(text || "Failed to create expense");
    }
    toast.success(`Expense "${payload.name}" added!`);
    return redirect("/");
  }

  // Delete Expense
  if (_action === "deleteExpense") {
    const id = values.expenseId;
    const res = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: "DELETE",
      headers,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("Delete expense failed:", res.status, text);
      throw new Error(text || "Failed to delete expense");
    }
    toast.success("Expense deleted!");
    return redirect("/");
  }

  return null;
}

const Dashboard = () => {
  const { userName, expenses, apiTasks, authToken } = useLoaderData();

  if (!authToken) {
    return <Intro />;
  }

  return (
    <div className="dashboard">
      <h2>
        Welcome, <span className="accent">{userName}</span>
      </h2>

      {apiTasks && apiTasks.length > 0 ? (
        <div className="grid-lg">
          <div className="flex-lg">
            <AddBudgetForm />
            <AddExpenseForm budgets={apiTasks} />
          </div>

          <h2>Existing Budgets</h2>
          <div className="budgets">
            {apiTasks.map((task) => (
              <BudgetItem
                key={task.id}
                budget={task}
                spent={task.spent}
                showDelete={false}
                hideLink={false}
              />
            ))}
          </div>

          {expenses && expenses.length > 0 && (
            <div className="grid-md">
              <h2>Recent Expenses</h2>
              <Table expenses={expenses.slice(0, 8)} />
              {expenses.length > 10 && (
                <Link to="/expenses" className="btn btn--dark">
                  View all expenses
                </Link>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="grid-sm">
          <p>Personal budget is the secret to freedom.</p>
          <p>Let's start by creating your first budget!</p>
          <AddBudgetForm />
        </div>
      )}
    </div>
  );
};

export default Dashboard;