import React, { useState } from "react";
import CommonInput from "./CommonInput";
import "./App.css";

const DynamicForm = () => {
  const formConfig = [
    { type: "text", name: "username", label: "Username" },
    { type: "email", name: "email", label: "Email" },
    { type: "password", name: "password", label: "Password" },
    { type: "textarea", name: "bio", label: "Bio" },
    { type: "checkbox", name: "Aplly", label: "Apply for Internship" },
    {
      type: "radio",
      name: "gender",
      label: "Gender",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
    },
  ];

  const [formData, setFormData] = useState(
    formConfig.reduce((acc, field) => {
      acc[field.name] = field.type === "checkbox" ? false : "";
      return acc;
    }, {})
  );

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "email") {
      if (!validateEmail(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Invalid email format",
        }));
      } else {
        setErrors((prevErrors) => {
          const { email, ...rest } = prevErrors;
          return rest;
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email format",
      }));
      return;
    }
    console.log("Form Submitted: ", formData);
  };

  return (
    <form className="dynamic-form" onSubmit={handleSubmit}>
      {formConfig.map((field) => (
        <div className="form-group" key={field.name}>
          <CommonInput
            type={field.type}
            name={field.name}
            label={field.label}
            value={formData[field.name]}
            onChange={handleChange}
            options={field.options || []}
          />
          {errors[field.name] && <span className="error-message">{errors[field.name]}</span>}
        </div>
      ))}
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;
