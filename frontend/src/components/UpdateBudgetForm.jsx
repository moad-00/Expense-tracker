import { useFetcher } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

/**
 * Inline form used to update a budget's name and amount.
 * Expects parent action to handle _action = "updateBudget".
 */
const UpdateBudgetForm = ({ budget }) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const [name, setName] = useState(budget.name || "");
  const [amount, setAmount] = useState(Number(budget.amount) || 0);
  const focusRef = useRef(null);

  useEffect(() => {
    if (!isSubmitting) {
      focusRef.current?.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper" style={{ marginTop: "12px" }}>
      <h3 className="h3">Update budget</h3>
      <fetcher.Form method="post" className="grid-sm">
        <div className="grid-xs">
          <label htmlFor={`updateBudgetName-${budget.id}`}>Budget name</label>
          <input
            id={`updateBudgetName-${budget.id}`}
            name="updateBudgetName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            ref={focusRef}
            required
            placeholder="e.g. Groceries"
          />
        </div>
        <div className="grid-xs">
          <label htmlFor={`updateBudgetAmount-${budget.id}`}>Amount</label>
          <input
            id={`updateBudgetAmount-${budget.id}`}
            name="updateBudgetAmount"
            type="number"
            step="0.01"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            placeholder="e.g. 250"
          />
        </div>
        <input type="hidden" name="_action" value="updateBudget" />
        <input type="hidden" name="budgetId" value={budget.id} />
        <button className="btn btn--dark form-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating…" : "Update budget"}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default UpdateBudgetForm;