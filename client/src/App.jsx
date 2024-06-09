import { Routes, Route } from "react-router-dom"
import Header from  "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Logout from "./pages/Logout"
import UsersList from "./pages/UsersList"
import UserProfile from "./pages/UserProfile"
import Article from "./pages/Article"
import CreateArticle from "./pages/CreateArticle"
import EditArticle from "./pages/EditArticle"
import DeleteArticle from "./pages/DeleteArticle"
import CategoryArticles from "./pages/CategoryArticles"
import ErrorPage from "./pages/ErrorPage"
// import './App.scss'

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/users" element={<UsersList />} />
      <Route path="/users/:id" element={<UserProfile />} />
      <Route path="/article/:id" element={<Article />} />
      <Route path="/article/add" element={<CreateArticle />} />
      <Route path="/article/edit/:id" element={<EditArticle />} />
      <Route path="/article/delete/:id" element={<DeleteArticle />} />
      <Route path="/category" element={<CategoryArticles />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
