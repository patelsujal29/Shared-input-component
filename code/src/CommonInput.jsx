import React from "react";

const CommonInput = ({ 
  type = "text", 
  name, 
  label, 
  value, 
  onChange, 
  options = [], 
  ...props 
}) => {
  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            {...props}
          />
        );
      case "checkbox":
        return (
          <input
            type="checkbox"
            name={name}
            checked={value}
            onChange={onChange}
            {...props}
          />
        );
      case "radio":
        return options.map((option) => (
          <label key={option.value}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              {...props}
            />
            {option.label}
          </label>
        ));
      default:
        return (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            {...props}
          />
        );
    }
  };

  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      {renderInput()}
    </div>
  );
};

export default CommonInput;