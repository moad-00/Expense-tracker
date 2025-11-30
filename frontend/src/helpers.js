
export const fetchData = (key) => {
  const value = localStorage.getItem(key);
  
  if (!value || value === "undefined") return null; 

  try {
    return JSON.parse(value);
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}"`, error);
    return null;
  }
};



// waiting
export const wait = () => new Promise(res => setTimeout(res, Math.random() * 800));

// Format currency
export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency: "MAD"
    });
};

// Calculate spent amount by budget
export const CalculateSpentByBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
        if (expense.budgetId !== budgetId) return acc;
        return acc += expense.amount;
    }, 0);
    return budgetSpent;
};

// Format Percentages
export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0,
    });
};

// Format Date
export const formatDateToLocalString = (epoch) => new Date(epoch).toLocaleDateString();


export const getAllMatchingItems = ({ category, key, value }) => {
    const data = fetchData(category) ?? [];
    return data.filter((item) => item[key] === value);
};


export const deleteItem = ({ key, id }) => {
    const existingData = fetchData(key);
    if (id) {
        const newData = existingData.filter((item) => item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
};
