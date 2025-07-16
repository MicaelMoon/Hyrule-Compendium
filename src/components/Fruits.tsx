import React from 'react';

const Fruits: React.FC = () =>{
  const items = ['Apple', 'Banana', 'Orange', 'Grape'];

  return (
    <ul>
      {items.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  )
}

export default Fruits;