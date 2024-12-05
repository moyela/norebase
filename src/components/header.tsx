import { NavLink } from "react-router-dom";

// RouteLink renders the links for the site navigation links and external links
function RouteLink(props: {name:string, route:string}) {
    return (
      <div className="">
        <NavLink 
        className="text-md hover:text-lime-700 py-1 px-3 rounded-2xl border border-gray-300"
        to={props.route}
        title={`See ${props.name}`}>

            {props.name}    
        </NavLink>
      </div>
    )
  }

export default function Header() {
    return (
        <div className="text-center md:text-left flex flex-col">
            <div className="flex flex-col md:flex-row-reverse justify-around pb-2 min-w-min">
                
                <div className="mx-auto">
                    <p className="font-mono font-semibold text-2xl sm:text-3xl mt-2">
                        Crypto Token List
                    </p>
                </div>
            </div>

            <nav className="font-mono flex gap-5 sm:gap-10 text-sm justify-center mb-3" id="nav-bar">
                <RouteLink name="🔍" route="/search" />
                <RouteLink name="All Tokens🏠" route="/" />

                <RouteLink name="Liked ❤️" route="/liked" />
            </nav>

        </div>
    );
}

