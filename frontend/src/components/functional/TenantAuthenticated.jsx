import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function TenantAuthenticated() {
    const session=useSelector(state=>state.Tenant.TenantSession);

  return (
    session ? <Outlet/> : <Navigate to={'/logintenant'}/>
  )
}
