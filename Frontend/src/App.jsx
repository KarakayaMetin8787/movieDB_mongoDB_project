import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Detailpage from "./pages/Detailpage";
import Favorites from "./pages/Favorites";
import SubmitNewEntry from "./pages/SubmitNewEntry";
import SearchResults from "./pages/SearchResults";

function App() {
    return (
        <>
            <Routes>
                <Route path="/detailpage/:id" element={<Detailpage />} />
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/submit" element={<SubmitNewEntry />} />
                <Route path="/search" element={<SearchResults />} />
            </Routes>
        </>
    );
}

export default App;
