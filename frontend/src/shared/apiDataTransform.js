export const apiErrorTransform = (data, errorResponse) => {
  const newState = { ...data };
  // recursively flatten object
  console.log(errorResponse);
  const errorsFlat = Object.assign(
    {},
    ...function _flatten(o) {
      return [].concat(...Object.keys(o)
        .map(k =>
          typeof o[k] === 'object' && !Array.isArray(o[k])?
            _flatten(o[k]) :
            ({ [k]: o[k].join(' ') }),
        ),
      );
    }(errorResponse),
  )
  console.log(errorsFlat);
  for (const [key, value] of Object.entries(errorsFlat)) {
    console.log(data, key)
    if (!data[key].error) {
      newState[key] = { value: data[key], error: value }
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
