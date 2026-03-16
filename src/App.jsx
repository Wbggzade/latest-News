// App.js
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import News from "./components/News";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
return (
<div className="App">
<BrowserRouter>
<Navbar />

<div className="container">
<div className="row">
<div className="col-md">
<Routes>
<Route path="/" element={<Home />} />
<Route
path="/Entertainment"
element={<News key="entertainment" category="entertainment" />}
/>
<Route
path="/Technology"
element={<News key="technology" category="technology" />}
/>
<Route
path="/Sports"
element={<News key="sports" category="sports" />}
/>
<Route
path="/Business"
element={<News key="business" category="business" />}
/>
<Route
path="/Health"
element={<News key="health" category="health" />}
/>
<Route
path="/Science"
element={<News key="science" category="science" />}
/>
</Routes>
</div>
</div>
</div>
</BrowserRouter>
</div>
);
}

export default App;
