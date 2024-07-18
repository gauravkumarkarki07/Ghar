import AccountUtilCard from "../../components/ui/AccountUtilCard";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const session=useSelector(state=>state.Landlord.LandlordSession.landlordDetails);
  const totalProperties=session.properties.length;
  console.log(session)
  return (
    <section className="max-w-[1290px] mx-auto my-6">
      <AccountUtilCard
        heading1={`Total Listed Properties: ${totalProperties}`}
      />
    </section>
  )
}
