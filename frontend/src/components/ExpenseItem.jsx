import { TrashIcon } from "@heroicons/react/24/solid";
import { formatCurrency, formatDateToLocalString } from "../helpers";
import { Link, useFetcher } from "react-router-dom";

const ExpenseItem = ({ expense, showBudget = true }) => {
  const fetcher = useFetcher();
  const budget = expense.task;

  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocalString(expense.created_at)}</td>
      {showBudget && (
        <td>
          {budget ? (
            <Link
              to={`/budget/${budget.id}`}
              style={{ "--accent": `${budget.id * 34} 65% 50%` }}
            >
              {budget.name}
            </Link>
          ) : (
            <span className="error">No budget</span>
          )}
        </td>
      )}
      <td>
        <fetcher.Form
          method="post"
          onSubmit={(e) => {
            if (!confirm("Delete this expense?")) e.preventDefault();
          }}
        >
          <input type="hidden" name="_action" value="deleteExpense" />
            <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.name} expense`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default ExpenseItem;