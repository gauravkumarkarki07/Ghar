import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function TenantAuthenticated() {
    const session=useSelector(state=>state.Landlord.LandlordSession);

  return (
    session ? <Outlet/> : <Navigate to={'/loginlandlord'}/>
  )
}
