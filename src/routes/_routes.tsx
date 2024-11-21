import Home from './default_table.js'
import ErrorPage from './_error_default.js'
import { Route , Routes} from "react-router-dom";
import FavouriteTokens from './favourites_tokens.js';

export default function Routing() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/favourites" element={<FavouriteTokens/>} /> 
          <Route path="*" element={<ErrorPage/>} />
        </Routes>
    </div>
  )
}
