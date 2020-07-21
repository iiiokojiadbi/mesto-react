import React from 'react';

function ButtonSubmitForm({ text, label }) {
  return (
    <button
      type="submit"
      className="btn btn_type_submit form__btn-submit"
      aria-label={label}
    >
      {text}
    </button>
  );
}

export default ButtonSubmitForm;
