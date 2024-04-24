import { Routes, Route } from "react-router-dom"
import Header from  "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Article from "./pages/Article"
import Home from "./pages/Home"
// import './App.scss'

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/article/:id" element={<Article />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
