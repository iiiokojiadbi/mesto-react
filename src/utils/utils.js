const eventOnInput = (inputs) => {
  const evt = new Event('input');
  inputs.forEach((input) => input.dispatchEvent(evt));
};

export { eventOnInput };
