import { Form, Link } from "react-router-dom";
import { formatCurrency } from "../helpers";
import { useState } from "react";
import UpdateBudgetForm from "./UpdateBudgetForm";

const BudgetItem = ({ budget, spent = 0, showDelete = false, hideLink = false }) => {
  const { id, name, amount, color } = budget;
  const used = Number(spent) || 0;
  const remaining = Math.max(Number(amount) - used, 0);

  const [showUpdate, setShowUpdate] = useState(false);

  return (
    <div className="budget" style={{ "--accent": color }}>
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>

      <progress max={amount || 1} value={Math.min(used, amount)} />

      <div className="progress-text">
        <small>{formatCurrency(used)} Spent</small>
        <small>{formatCurrency(remaining)} Remaining</small>
      </div>

      <div className="flex-sm budget-actions-row">
        {showDelete ? (
          <Form
            method="post"
            onSubmit={(e) => {
              if (!confirm(`Delete budget "${name}"?`)) e.preventDefault();
            }}
          >
            <input type="hidden" name="_action" value="deleteBudget" />
            <button type="submit" className="btn btn--warning">
              <span>Delete Budget</span>
            </button>
          </Form>
        ) : (
          !hideLink && (
            <Link to={`/budget/${id}`} className="btn">
              <span>View details</span>
            </Link>
          )
        )}

        {/* Keep update toggle stable; don’t hide on hover */}
        <button
          type="button"
          className="btn btn--outline"
          onClick={() => setShowUpdate(true)}
        >
          Update
        </button>
      </div>

      {showUpdate && (
        <div className="update-form-block">
          <UpdateBudgetForm budget={budget} />
          <div className="flex-sm" style={{ marginTop: "8px" }}>
            <button
              type="button"
              className="btn btn--outline"
              onClick={() => setShowUpdate(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetItem;