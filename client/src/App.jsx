import { Routes, Route } from "react-router-dom"
import Header from  "./components/Header/Header"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Logout from "./pages/Logout"
import UsersList from "./pages/UsersList"
import Authors from "./pages/Authors"
import UserProfile from "./pages/UserProfile"
import Article from "./pages/Article"
import AuthorArticles from "./pages/AuthorArticles"
import CreateArticle from "./pages/CreateArticle"
import EditArticle from "./pages/EditArticle"
import DeleteArticle from "./pages/DeleteArticle"
import ErrorPage from "./pages/ErrorPage"

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
      <Route path="/authors" element={<Authors />} />
      <Route path="/profile/:id" element={<UserProfile />} />
      <Route path="/profile/:id/articles" element={<AuthorArticles />} />
      <Route path="/article/:id" element={<Article />} />
      <Route path="/article/add" element={<CreateArticle />} />
      <Route path="/article/edit/:id" element={<EditArticle />} />
      <Route path="/article/delete/:id" element={<DeleteArticle />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
    </>
  )
}

export default App
