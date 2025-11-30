import { useLoaderData, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchData } from "../helpers";

import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
import AddExpenseForm from "../components/AddExpenseForm";
import UpdateBudgetForm from "../components/UpdateBudgetForm";

const API_BASE_URL = "https://rosy-marilee-hyperpathetical.ngrok-free.dev/api";

/**
 * Loader: fetch a single budget (task) and all expenses, then isolate those
 * belonging to this budget.
 */
export async function BudgetLoader({ params }) {
  const authToken = fetchData("authToken");
  if (!authToken) throw new Error("Session expired.");

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${authToken}`,
    "ngrok-skip-browser-warning": "true",
  };

  let tasks = [];
  let expenses = [];
  try {
    const [tasksRes, expensesRes] = await Promise.all([
      fetch(`${API_BASE_URL}/tasks`, { headers }),
      fetch(`${API_BASE_URL}/expenses`, { headers }),
    ]);
    if (tasksRes.ok) tasks = await tasksRes.json();
    if (expensesRes.ok) expenses = await expensesRes.json();
  } catch (e) {
    console.error("BudgetLoader error:", e);
  }

  const idx = tasks.findIndex((t) => String(t.id) === String(params.id));
  const task = tasks[idx];
  if (!task) throw new Error("The budget you're trying to find doesn't exist.");

  const budget = {
    ...task,
    color: `${idx * 34} 65% 50%`,
    name: task.name ?? task.title ?? "Untitled",
    amount: Number(task.amount ?? task.budget_amount ?? 0),
  };

  const budgetExpenses = expenses.filter((e) => {
    const taskId = e.task_id ?? e.task?.id;
    return String(taskId) === String(params.id);
  });

  const spent = budgetExpenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  );

  return { budget, expenses: budgetExpenses, spent };
}

/**
 * Action: handles createExpense, updateBudget, deleteExpense, deleteBudget
 */
export async function budgetAction({ request, params }) {
  const authToken = fetchData("authToken");
  if (!authToken) throw new Error("Session expired.");

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${authToken}`,
    "ngrok-skip-browser-warning": "true",
  };

  const fd = await request.formData();
  const { _action, ...values } = Object.fromEntries(fd);

  // CREATE EXPENSE
  if (_action === "createExpense") {
    const payload = {
      name: values.newExpense?.trim(),
      amount: Number(values.newExpenseAmount),
      budgetId: values.newExpenseBudget,
    };
    if (!payload.name || isNaN(payload.amount)) {
      throw new Error("Invalid expense data.");
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
    return redirect(`/budget/${params.id}`);
  }

  // UPDATE BUDGET
  if (_action === "updateBudget") {
    const id = values.budgetId || params.id;
    const payload = {
      name: values.updateBudgetName?.trim(),
      amount: Number(values.updateBudgetAmount),
    };
    if (!payload.name || isNaN(payload.amount)) {
      throw new Error("Invalid budget data.");
    }

    // Try PATCH first (typical for Laravel), fallback to PUT if PATCH not allowed
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
    return redirect(`/budget/${id}`);
  }

  // DELETE EXPENSE
  if (_action === "deleteExpense") {
    const res = await fetch(`${API_BASE_URL}/expenses/${values.expenseId}`, {
      method: "DELETE",
      headers,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("Delete expense failed:", res.status, text);
      throw new Error(text || "Failed to delete expense");
    }
    toast.success("Expense deleted!");
    return redirect(`/budget/${params.id}`);
  }

  // DELETE BUDGET
  if (_action === "deleteBudget") {
    const res = await fetch(`${API_BASE_URL}/tasks/${params.id}`, {
      method: "DELETE",
      headers,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("Delete budget failed:", res.status, text);
      throw new Error(text || "Failed to delete budget");
    }
    toast.success("Budget deleted!");
    return redirect("/");
  }

  return null;
}

const BudgetPage = () => {
  const { budget, expenses, spent } = useLoaderData();

  return (
    <div className="grid-lg" style={{ "--accent": budget.color }}>
      <h1 className="h2">
        <span className="accent">{budget.name}</span> Overview
      </h1>

      <div className="flex-lg">
        <BudgetItem
          budget={budget}
          spent={spent}
          showDelete={true}
          hideLink={true}
        />
        <AddExpenseForm budgets={[budget]} />
      </div>

      {/* Inline standalone update form */}
      <UpdateBudgetForm budget={budget} />

      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name}</span> Expenses
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;