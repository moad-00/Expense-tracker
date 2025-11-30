import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";

const AddExpenseForm = ({ budgets }) => {
  const fetcher = useFetcher();
  const formRef = useRef();
  const focusRef = useRef();
  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current?.reset();
      focusRef.current?.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Add new <span className="accent">{budgets.length === 1 ? budgets[0].name : ""}</span> Expense
      </h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense Name</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g , Milk"
              ref={focusRef}
              required
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Amount</label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder="e.g , 10"
              required
            />
          </div>
        </div>

        <div className="grid-xs" hidden={budgets.length === 1}>
          <label htmlFor="newExpenseBudget">Budget Category</label>
          <select name="newExpenseBudget" id="newExpenseBudget" required>
            {budgets.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
        {budgets.length === 1 && (
          <input type="hidden" name="newExpenseBudget" value={budgets[0].id} />
        )}

        <input type="hidden" name="_action" value="createExpense" />
        <button className="btn btn--dark form-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Adding…</span>
          ) : (
            <>
              <span>Add Expense</span>
              <PlusCircleIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddExpenseForm;