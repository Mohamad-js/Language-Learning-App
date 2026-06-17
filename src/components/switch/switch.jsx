import React from 'react';

const Switch = ({ darkTheme, setDarkTheme }) => {
  return (
    <label 
      onClick={(e) => e.stopPropagation()}
      className="relative inline-block text-[17px] w-13 h-[1.5em]">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={darkTheme}
        onChange={() => setDarkTheme(!darkTheme)}
      />

      <span
        className="
          absolute inset-0
          cursor-pointer
          rounded-full
          bg-gray-300

          transition-all
          duration-[400ms]
          ease-[cubic-bezier(0.175,0.885,0.32,1.275)]

          peer-checked:bg-green-400
          peer-focus:shadow-[0_0_1px_#0974f1]

          before:content-['']
          before:absolute
          before:inset-0
          before:flex
          before:h-[1.5em]
          before:w-[1.5em]
          before:items-center
          before:justify-center
          before:rounded-[50px]
          before:bg-white

          before:transition-all
          before:duration-[400ms]
          before:ease-[cubic-bezier(0.175,0.885,0.32,1.275)]

          peer-checked:before:translate-x-[1.52em]
        "
      />
    </label>
  );
};

export default Switch;