export const setFormDataValue = (
  setFormData: (value: any) => void,
  formData: any,
  key: string,
  value: string
) => {
  setFormData({ ...formData, [key]: value });
};
