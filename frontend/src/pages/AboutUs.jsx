export default function AboutUs() {

  return (
    <section className="bg-accent" id="aboutus">
      <section className="max-w-[1290px] m-auto flex flex-col gap-6 py-16">
        <h1 className="text-white text-3xl">About Us</h1>
        <h2 className="text-gray">Our Mission</h2>
        <article className="flex flex-col gap-4 text-gray">
          <p>
            At Ghar, we are committed to revolutionizing the rental market by providing a seamless,
           transparent, and efficient platform for tenants and landlords. Our mission
           is to simplify the rental process, making it easier for everyone to find their perfect home or tenant.
          </p>
          <p>
          Ghar was born out of the frustration of dealing with traditional rental processes. 
          We recognized the need for a modern, digital solution that could eliminate unnecessary 
          complexities and provide a better experience for both parties. Our journey began with a simple idea: 
          to connect tenants directly with landlords, facilitating communication and transparency.
          </p>
        </article>
      </section>
    </section>
  );
}
