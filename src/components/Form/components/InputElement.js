import React from 'react'

const InputElement = (props) => {

    const { name, type, value, placeholder, className, label, handleChange, icon, error, touched, disable, id } = props;

  return (
    <div className="mb-3">
        <label htmlFor={name} className="form-label">
            {label}
        </label>
        <div className={(error && touched) ? 'username error-border' : 'username'} id={id ? id : ''}>
            { icon }
            <input
                disabled={disable}
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
                className={className}
                placeholder={placeholder}
            />
        </div>     
        {
            (error && touched) && <small className='error-msg'>{error}</small>
        }                   
    </div> 
  )
}

export default InputElement