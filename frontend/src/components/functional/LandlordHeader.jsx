import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import ApiRequestManager from "../../services/apiRequest/ApiRequestManager.js";
import { useDropDownToggle } from "../../hooks/useDropDownToggle.js";
import { AuthEndPoints } from "../../services/apiRequest/EndPoints.js";
import { logout } from "../../services/redux/Global/GlobalSlice.js";
import { FaAngleDown } from "react-icons/fa";

export default function LandlordHeader() {
  const dispatch = useDispatch();

  const { postRequest } = ApiRequestManager();

  const { handleDropDown, dropDownVisible, dropDownRef } = useDropDownToggle();

  const session = useSelector(
    (state) => state.Landlord.LandlordSession.landlordDetails
  );

  const handleLogout = async () => {
    const response = await postRequest(AuthEndPoints.Logout);
    if (response) {
      dispatch(logout());
    }
  }
  return (
    <header className="flex items-center justify-between py-4 border-b-2 border-accent max-w-[1290px] m-auto">
      <Link to={'landlord'}>
        <h1 className="font-semibold text-2xl">
            GHAR
        </h1>
      </Link>
        <nav className="flex items-center gap-8 text-gray">
          <NavLink to={'landlord/dashboard'} className={({isActive})=>isActive?'text-black underline underline-offset-8':''}>
            Dashboard
          </NavLink>
          <NavLink to={'landlord/messages'} className={({isActive})=>isActive?'text-black underline underline-offset-8':''}>
            Messages
          </NavLink>
          <NavLink to={'landlord/myproperties'} className={({isActive})=>isActive?'text-black underline underline-offset-8':''}>
            My Properties
          </NavLink>
        </nav>
        <section className="relative cursor-pointer" onClick={handleDropDown} ref={dropDownRef}>
        <section className="flex gap-2 items-center px-2 py-1 border rounded-md">
          <img
            src={session?.profilePicture}
            alt="User profile picture"
            className="w-5 h-5 rounded-full overflow-clip"
          />
          <span>{session?.username}</span>
          <FaAngleDown/>
        </section>
        {dropDownVisible && (
          <section className="absolute right-0 mt-2 border px-2 py-2 rounded-md flex flex-col gap-2 text-sm bg-white shadow-lg z-50">
            <span className="text-gray cursor-default">
              {session?.email}
            </span>
            <hr />
            <Link to="landlord/account" className="hover:text-primary hover:font-semibold">
              Account
            </Link>
            <span className="hover:text-primary hover:font-semibold" onClick={handleLogout}>
              Logout
            </span>
          </section>
        )}
      </section>
    </header>
  )
}
