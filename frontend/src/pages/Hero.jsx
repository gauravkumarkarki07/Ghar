import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";
import Testimonials from "./Testimonials";

export default function Hero() {
  return (
    <section className="max-w-[1290px] m-auto py-16 flex flex-col gap-8">
        <h1 className="text-4xl">
            Find Your Perfect Rental Home
        </h1>
        <article className="w-1/2">
            <p className="text-lg">
            Explore a vast selection of rental properties, connect directly with landlords, 
            and make informed decisions with Ghar. Your next home is just a few clicks away.
            </p>
        </article>
        <section className="flex flex-col md:flex-row gap-6">
            <section className="md:w-1/2">
                <InputField
                    name={'search'}
                    placeholder={'Search Address, Suburbs or Place'}
                />
            </section>
            <section>
                <Button>
                    Search
                </Button>
            </section>
        </section>
        {/* <Testimonials/> */}
    </section>
  )
}
