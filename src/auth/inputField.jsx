import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./inputField.scss";

export default function InputField({
  title,
  name,
  type,
  placeholder,
  onChange,
  errorMsg,
  autocomplete,
}) {
  const [hidden, setHidden] = useState(false);

  return (
    <div className="containerInputField">
      <label htmlFor={name} className="form-label">
        {title}:
      </label>
      <div className={type == "password" ? "input-group" : ""}>
        <input
          type={type == "password" ? (hidden ? "text" : "password") : type}
          className="form-control"
          style={errorMsg ? { borderColor: "red" } : {}}
          id={name}
          placeholder={placeholder}
          onChange={onChange}
          autoComplete={autocomplete}
        />
        {type == "password" ? (
          <a
            onClick={() => setHidden(!hidden)}
            href="#"
            className="input-group-text"
          >
            {hidden ? (
              <FontAwesomeIcon
                icon={faEye}
                width={15}
                height={15}
                color="#fff"
              />
            ) : (
              <FontAwesomeIcon
                icon={faEyeSlash}
                width={15}
                height={15}
                color="#fff"
              />
            )}
          </a>
        ) : null}
        {errorMsg && (
          <div
            className="invalid-feedback"
            style={{ color: "red", display: "block" }}
          >
            {errorMsg}
          </div>
        )}
      </div>
    </div>
  );
}

InputField.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  errorMsg: PropTypes.string,
  autocomplete: PropTypes.string,
};
