import React from "react";
import validator from "validator";
import { regex } from "../utils/constants";

export  default function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const updateValue = (name, value) => setValues((values) => ({ ...values, [name]: value }));

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());

    if(name === 'name') {
      if(value === '') {
          setErrors({...errors, [name]: 'Вы пропустили это поле.' });
      } else if(!regex.test(value)) {
      setErrors({...errors, [name]: 'Поле может содержать только латиницу, кириллицу, пробел или дефис.' });
      setIsValid(false)
      } else {
      setErrors({...errors, [name]: target.validationMessage });
      }
    }

    if(name === 'email') {
      if(value === '') {
        setErrors({...errors, [name]: 'Вы пропустили это поле.' });
      } else if(!validator.isEmail(value)) {
        setErrors({...errors, [name]: 'Некорректный E-Mail.' });
        setIsValid(false)
      } else {
        setErrors({...errors, [name]: target.validationMessage });
      }
    }
        
  };

  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm, updateValue };
}