import React, { useContext } from 'react';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Loader from 'react-loader-spinner';

import { StatusRenderContext } from './../../contexts/StatusRenderContext';

const ButtonSubmitForm = ({ text, label }) => {
  const isRenderer = useContext(StatusRenderContext);

  return (
    <button
      type="submit"
      className="btn btn_type_submit form__btn-submit"
      aria-label={label}
    >
      {isRenderer ? (
        <Loader
          type="ThreeDots"
          color="#ffffff"
          height={80}
          width={80}
          className="btn__spinner"
        />
      ) : (
        text
      )}
    </button>
  );
};

export default ButtonSubmitForm;
