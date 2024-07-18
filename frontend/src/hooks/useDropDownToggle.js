import { useEffect,  useState,useRef } from "react";

export const useDropDownToggle = () => {

    const dropDownRef=useRef();

  const [dropDownVisible, setDropDownVisible] = useState(false);

  const handleDropDown = () => {
    setDropDownVisible(!dropDownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
      setDropDownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return{handleDropDown,dropDownVisible,dropDownRef}
};
