import { useState } from "react";

export default function useInput(defaultValue) {
  let [value, setValue] = useState(defaultValue);

  function onChange(e) {
    setValue(e.target.value);
  }

  return { value, onChange };
}
