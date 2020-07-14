import React from 'react';

class PopupWithForm extends React.Component {
  render() {
    const { name, title } = this.props;

    console.log(name, title);

    return (
      <section className="popup popup_disabled" id={`popup${name}`}>
        <div className="popup__container">
          <button
            type="button"
            aria-label="закрыть"
            className="btn btn_type_close popup__btn-close form__btn-close"
            name="closeForm"
          ></button>
          <h3 className="form__title">{title}</h3>
          <form
            name={name}
            method="post"
            action="#"
            className="form popup__form"
          >
            {this.props.children}
          </form>
        </div>
      </section>
    );
  }
}

export default PopupWithForm;
