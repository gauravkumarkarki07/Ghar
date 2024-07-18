import PropTypes from 'prop-types';

export default function AccountUtilCard({logo,heading1,descp}) {
  return (
    <section className='flex flex-col gap-2 px-2 py-4 border border-accent w-[300px] rounded-md'>
        <span className='text-2xl'>
            {logo}
        </span>
        <h1 className='text-lg'>
            {heading1}
        </h1>
        <p className='text-gray'>
        {descp}
        </p>
    </section>
  )
}

AccountUtilCard.propTypes={
    logo:PropTypes.element,
    heading1:PropTypes.string,
    descp:PropTypes.string
}
