import UtilityCard from "../components/ui/UtilityCard";

export default function Testimonials() {
  return (
    <section className="flex flex-col items-center py-12 gap-6">
        <h1 className="text-gray">
            Trusted by 100K+ users
        </h1>
        <UtilityCard
            title={'I Love It'}
            description={'I found my perfect home from Ghar'}
        />
    </section>
  )
}
