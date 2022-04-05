import React from 'react'

const InputElement = (props) => {

    const { name, type, value, placeholder, className, label, handleChange, icon, error, disable, id } = props;

  return (
    <div className="mb-3">
        <label htmlFor={name} className="form-label">
            {label}
        </label>
        <div className={error ? 'username error-border' : 'username'} id={id ? id : ''}>
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
            <small className='error-msg'>{error}</small>
        }                   
    </div> 
  )
}

export default InputElement