import { Link, NavLink } from "react-router-dom";
import { useDropDownToggle } from "../../hooks/useDropDownToggle";
import { FaAngleDown } from "react-icons/fa";

export default function GeneralHeader() {
  const{handleDropDown,dropDownRef,dropDownVisible}=useDropDownToggle();

  const handleAbout=()=>{

    const anchor = document.querySelector('#aboutus')
    anchor.scrollIntoView({ behavior: 'smooth' })
  }
  
  return (
    <header className="flex items-center justify-between py-4 border-b-2 border-accent max-w-[1290px] m-auto">
      <Link to={'/'}>
        <h1 className="font-semibold text-2xl">
            GHAR
        </h1>
      </Link>
        <nav className="flex items-center gap-8 text-gray">
          <NavLink to={'/home'} className={({isActive})=>isActive?'text-black underline underline-offset-8':'hover:text-black'}>
            Home
          </NavLink>
          <span onClick={handleAbout} className="hover:cursor-pointer hover:text-black">
            About Us
          </span>
          <NavLink to={'/properties'} className={({isActive})=>isActive?'text-black underline underline-offset-8':'hover:text-black'}>
            Explore Properties
          </NavLink>
        </nav>
        <section onClick={handleDropDown} ref={dropDownRef} className="relative">
            <span className="cursor-pointer flex items-center gap-1 px-2 py-1 border border-accent rounded-md">
              Login
          <FaAngleDown/>

            </span>
            {dropDownVisible && 
            <section className="flex flex-col gap-1 absolute mt-4 border rounded-md right-0 bg-white text-sm px-3 py-1">
              <Link className="w-full text-nowrap hover:text-primary hover:font-semibold" to={'/logintenant'}>
                Login Tenant
              </Link>
              <Link to={'/loginlandlord'} className="w-full text-nowrap hover:text-primary hover:font-semibold">
                Login Landlord
              </Link>
            </section>
            }

        </section>
    </header>
  )
}
