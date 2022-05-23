import { NavLink } from "react-router-dom"
import Rocket404 from "../../assests/Rocket404.png"
import './404.css'


export default function BadWay() {
    return(
        <div className="badWay">
            <img className="rocket" src={Rocket404} alt="Prepare For Troubles" />
            <div>
                <h3 className="jessie"> Prepare for troubles... </h3>
                <h3 className="james"> ...and make it double! </h3>
            </div>
            <NavLink to='/'>
                <input className='scape' type="button" value="Run Away" />
            </NavLink>
        </div>
        
    )
}