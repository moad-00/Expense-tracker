import { useFetcher } from "react-router-dom";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";

const AddBudgetForm = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting && formRef.current) {
      formRef.current.reset();
      focusRef.current?.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create budget</h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g, Wifi"
            required
            ref={focusRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            step="0.01"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g, 500DH"
            required
            inputMode="decimal"
          />
        </div>
        <input type="hidden" name="_action" value="CreateBudget" />
        <button className="btn btn--dark form-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Creating…</span>
          ) : (
            <>
              <span>Create budget</span>
              <CurrencyDollarIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetForm;