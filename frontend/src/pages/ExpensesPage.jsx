import { useLoaderData, redirect } from "react-router-dom";
import { fetchData } from "../helpers";
import Table from "../components/Table";
import { toast } from "react-toastify";
import { useMemo, useState, useRef, useEffect } from "react";

const API_BASE_URL = "https://rosy-marilee-hyperpathetical.ngrok-free.dev/api";

export async function expensesLoader() {
  const authToken = fetchData("authToken");
  if (!authToken) throw new Error("Session expired.");

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${authToken}`,
    "ngrok-skip-browser-warning": "true",
  };

  const res = await fetch(`${API_BASE_URL}/expenses`, { headers });
  if (!res.ok) {
    throw new Error("Failed to load expenses.");
  }
  const expenses = await res.json();

  // Sort newest first
  const sorted = expenses
    .slice()
    .sort(
      (a, b) =>
        new Date(b.created_at || b.createdAt) -
        new Date(a.created_at || a.createdAt)
    );

  return { expenses: sorted };
}

export async function expensesAction({ request }) {
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

  if (_action === "deleteExpense") {
    const id = values.expenseId;
    const res = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: "DELETE",
      headers,
    });
    if (!res.ok) throw new Error("Failed to delete expense");
    toast.success("Expense deleted!");
    return redirect("/expenses");
  }

  return null;
}

const ExpensesPage = () => {
  const { expenses } = useLoaderData();

  // Client-side search
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return expenses;
    return expenses.filter((e) =>
      String(e.name || "").toLowerCase().includes(q)
    );
  }, [expenses, query]);

  return (
    <div className="grid-lg">
      <h1 className="h2">All Expenses</h1>

      {/* Search UI */}
      <div className="grid-sm" style={{ width: "100%", maxWidth: "700px" }}>
        <div className="grid-xs">
          <label htmlFor="expenseSearch">Search by name</label>
          <input
            id="expenseSearch"
            type="search"
            placeholder="e.g. milk"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputRef}
          />
        </div>
        <div className="flex-sm">
          <small className="muted">
            Showing {filtered.length} of {expenses.length}
          </small>
          {query && (
            <button
              type="button"
              className="btn btn--outline"
              onClick={() => setQuery("")}
              style={{ marginLeft: "auto" }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results table */}
      {filtered.length > 0 ? (
        <div className="grid-md">
          <Table expenses={filtered} showBudget={true} />
        </div>
      ) : (
        <p className="muted">No expenses match your search.</p>
      )}
    </div>
  );
};

export default ExpensesPage;