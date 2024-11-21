import { NavLink } from "react-router-dom";

// RouteLink renders the links for the site navigation links and external links
function RouteLink(props: {name:string, route:string}) {
    return (
      <div className="">
        <NavLink 
        className="text-md hover:text-lime-700 py-1 px-3 rounded-2xl"
        to={props.route}
        title={`Switch to ${props.name}`}>

            {props.name}    
        </NavLink>
      </div>
    )
  }


export default function Header() {
    return (
        <div className="text-center md:text-left flex flex-col">
            <div className="flex flex-col md:flex-row-reverse justify-around py-2 md:pt-1 min-w-min">
                
                <div className="md:pt-1 mx-auto">
                    <p className="font-mono font-semibold text-2xl md:text-4xl">
                        Crypto Token List
                    </p>
                </div>
            </div>

            <nav className="font-mono flex gap-10 justify-center mb-2" id="nav-bar">
                <RouteLink name="ALL TOKENS" route="/" />
                <RouteLink name="❤️" route="/favourites" />
            </nav>

            {/* direct to main site */}
            <a href="https://norebase.moyela.com" className="text-center text-sm text-gray-400 hover:text-gray-600">
                <p>View Main Site</p>
            </a>
        </div>
    );
}

