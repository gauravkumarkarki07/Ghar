import PropTypes from 'prop-types';
import {cva} from 'class-variance-authority';

const buttonStyle=cva(
    'border rounded-md px-5 py-2 font-poppins hover:brightness-90 w-full',
    {
        variants:{
            variant:{
                primary:'bg-primary text-white',
                secondary:'bg-secondary text-white',
                accent:'bg-accent text-white',
                white:'bg-white text-black hover:bg-secondary hover:text-white',
                google:'bg-white text-black hover:bg-black hover:text-white',
                danger:'bg-red-700 text-white'
            }
        },
        defaultVariants:{
            variant:'primary'
        }
    }
)

export default function Button({type="submit",onClick,variant,...props}) {
  return (
    <button
        type={type}
        onClick={onClick}
        className={buttonStyle({variant})}
        {...props}
    />
  )
}

Button.propTypes={
    type:PropTypes.string,
    onClick:PropTypes.func,
    variant:PropTypes.string
}
