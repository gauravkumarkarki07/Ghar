import AccountUtilCard from "../../components/ui/AccountUtilCard";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";

export default function LandlordAccount() {
  return (
    <section className="max-w-[1290px] m-auto mt-4 flex flex-col">
      <section className="px-4 py-4 bg-primary text-white rounded-md flex flex-col gap-2">
        <h1 className="font-semibold text-3xl">Account</h1>
        <span>Manager Your Account Settings</span>
      </section>
      <section className="flex gap-6 py-4">
        <Link to={"profilesettings"}>
          <AccountUtilCard
            logo={<FaRegUser />}
            heading1={"Profile Settings"}
            descp={"Manage your profile settings here"}
          />
        </Link>

        <Link to={"passwordsettings"}>
          <AccountUtilCard
            logo={<RiLockPasswordLine />}
            heading1={"Password Settings"}
            descp={"Manage your password"}
          />
        </Link>

        <Link to={"/landlord/myproperties"}>
          <AccountUtilCard
            logo={<FaHouse/>}
            heading1={"My Properties"}
            descp={"Your saved properties"}
          />
        </Link>
      </section>
    </section>
  );
}
