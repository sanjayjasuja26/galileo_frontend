import React from 'react'

const InputElement = (props) => {

    const { name, type, value, placeholder, className, label, handleChange, icon, error } = props;

  return (
    <div className="mb-3">
        <label htmlFor={name} className="form-label">
            {label}
        </label>
        <div className="username">
            { icon }
            <input
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
                className={className}
                placeholder={placeholder}
            />
        </div>     
        {
            <span>{error}</span>
        }                   
    </div> 
  )
}

export default InputElement