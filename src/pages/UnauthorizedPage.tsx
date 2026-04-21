import { Link } from 'react-router-dom'
import { Heading } from '../components/Heading'

export const UnauthorizedPage = () => {
  return (
    <>
    <Heading headingText={"Login kar pehle"}></Heading>
    <button><Link to={"/login"}>Login</Link></button>
    </>
  )
}
