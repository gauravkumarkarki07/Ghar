import PropTypes from 'prop-types';
import React from 'react';

const InputField = React.forwardRef(({ type='text', value, onChange, name, placeholder, ...props }, ref) => {
  return (
    <input
      ref={ref}
      name={name}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      {...props}
      className="px-4 py-2 text-gray border rounded-md w-full focus:outline-none"
    />
  );
});

InputField.displayName = 'InputField';

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string
};

export default InputField;
