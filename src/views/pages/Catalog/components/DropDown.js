import React from 'react';

const DropDown = ({ onChange, value, data }) => (
  <div className="select">
    <select onChange={onChange} value={value}>
      {data.map(item => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
    <div className="select__arrow" />
  </div>
);

export default DropDown;
