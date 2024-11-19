import Home from './default_table.js'
// import Best from './favourites_table.js'
import ErrorPage from './_error_default.js'
import { Route , Routes} from "react-router-dom";

export default function Routing() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          {/* <Route path="/favourites" element={<Best/>} />  */}
          <Route path="*" element={<ErrorPage/>} />
        </Routes>
    </div>
  )
}
