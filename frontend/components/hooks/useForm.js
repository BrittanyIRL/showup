import { useEffect, useState } from "react";

export default function useForm(initialInputValues = {}) {
  const [inputs, setInputs] = useState(initialInputValues);
  const initialValues = Object.values(initialInputValues).join("");

  useEffect(() => {
    setInputs(initialInputValues);
  }, [initialValues]);

  function handleChange(e) {
    console.log(e.target);
    let { value, name, type } = e.target;
    if (type === "number") {
      value = parseInt(value);
    }
    if (type === "file") {
      [value] = e.target.files;
    }
    if (type === "date") {
      console.log("HEY I AM A DATE!!");
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initialInputValues);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key]) => [key, ""])
    );
    setInputs(blankState);
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
