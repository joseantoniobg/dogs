export const validateForm = (formFields) => {
  let validForm = true;
  Object.values(formFields).forEach((formField) => {
    if (validForm && !formField.validate()) validForm = false;
  });
  return validForm;
};
