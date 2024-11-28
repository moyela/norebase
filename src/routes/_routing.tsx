import Home from './default_table.js'
import PageNotFound from './page_not_found.js'
import { Route , Routes } from "react-router-dom";
import LikedTokens from './liked_tokens.js';

export default function Routing() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/favourites" element={<LikedTokens/>} /> 
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
    </div>
  )
}
