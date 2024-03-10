import React from "react";
import Nav from './Nav.jsx';
import {BrowserRouter,Route , Routes} from "react-router-dom";
import Create from "./Create.jsx";
import All from "./All.jsx";
import Update from "./Update.jsx";

function App()
{
    return(
        <div>
            <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/create" element={<Create/>}> </Route>
                <Route path="/update/:id" element={<Update />}></Route>
                <Route path ='/all' element={<All />}></Route>
            </Routes>
            </BrowserRouter>

        </div>
        )
}
export default App; 