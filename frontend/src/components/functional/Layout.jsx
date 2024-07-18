import { Outlet } from "react-router-dom";
import GeneralHeader from "./GeneralHeader";
import { useSelector } from "react-redux";
import TenantHeader from "./TenantHeader";
import LandlordHeader from "./LandlordHeader";

export default function Layout() {
  const tenantSession = useSelector(state => state.Tenant.TenantSession);
  const landlordSession = useSelector(state => state.Landlord.LandlordSession);

  return (
    <>
      <section className="font-poppins text-black text-base font-normal m-auto">
        {tenantSession ? (
          <TenantHeader />
        ) : landlordSession ? (
          <LandlordHeader />
        ) : (
          <GeneralHeader />
        )}
        <Outlet />
      </section>
    </>
  );
}
