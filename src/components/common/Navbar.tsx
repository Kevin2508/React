import { Link } from 'react-router-dom'
export const Navbar = () => {
  return (
    <div className=" bg-emerald-600 text-emerald-100 font-bold ">
        <ul className='flex justify-end p-2'>
          <li className='mx-3 hover:underline '><Link to={"/Home"} >Home</Link></li>
          <li className='mx-3 hover:underline '><Link to={"/Login"} >Login</Link></li>
          <li className='mx-3 hover:underline '><Link to={"/Register"} >Register</Link></li>
           <li className='mx-3 hover:underline '><Link to={"/about"} >About</Link></li>

        </ul>
    </div>
  )
}
