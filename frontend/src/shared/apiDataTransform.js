export const apiErrorTransform = (data, errorResponse) => {
  const newState = { ...data };
  // recursively flatten object
  const errorsFlat = Object.assign(
    {},
    ...function _flatten(o) {
      return [].concat(...Object.keys(o)
        .map(k => {
            if ((typeof o[k] === 'object' && !Array.isArray(o[k])) || typeof o[k][0] === 'object') {
              return _flatten(o[k]);
            } else {
              return { [k]: o[k].join(' ') };
            }
          },
        ),
      );
    }(errorResponse),
  )

  for (const [key, value] of Object.entries(errorsFlat)) {
    if (data[key] && !data[key].error) {
      newState[key] = { value: data[key], error: value }
    }
  }
  if (errorsFlat.non_field_errors) {
    newState.non_field_errors = errorsFlat.non_field_errors;
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
