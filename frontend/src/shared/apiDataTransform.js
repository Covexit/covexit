export const apiErrorTransform = (data, errorResponse) => {
  const newState = { ...data };
  for (const [key, value] of Object.entries(errorResponse)) {
    if (!data[key].error) {
      newState[key] = { value: data[key], error: value.join(' ') }
    }
  }
  return newState;
}

export const apiDataTransform = (data) => {
  const newState = { ...data };
  for (const [key, value] of Object.entries(newState)) {
    newState[key] = value.value || value;
  }
  return newState;
};
