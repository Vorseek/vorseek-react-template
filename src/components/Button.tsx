import { useState } from 'react';

export const Button = () => {
  const [state, setState] = useState(0);

  return (
    <button
      onClick={() => {
        setState((prev) => prev + 1);
      }}
    >
      Button count {state}
    </button>
  );
};
