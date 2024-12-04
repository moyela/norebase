import Home from './default_table.js'
import PageNotFound from './page_not_found.js'
import { Route , Routes } from "react-router-dom";
import LikedTokens from './liked_tokens_table.js';
import SearchedTokens from './searched_tokens_table.js';

export default function Routing() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/liked" element={<LikedTokens/>} /> 
          <Route path="/search" element={<SearchedTokens/>} /> 
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
    </div>
  )
}
