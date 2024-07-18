import PropTypes from 'prop-types';

export default function UtilityCard({img,title,description}) {
  return (
    <section className="flex flex-col gap-2 shadow-sm shadow-accent rounded-md px-2 py-2">
        <section className='flex items-center justify-center'>
            <img
                src={img}
                alt="Utility Images"
                className="w-10 h-10 rounded-md object-cover"
                />
        </section>
        <h1 className='font-semibold'>
            {title}
        </h1>
        <p className='text-gray'>
            {description}
        </p>
    </section>
  )
}

UtilityCard.propTypes={
    img:PropTypes.img,
    title:PropTypes.string,
    description:PropTypes.string
}
