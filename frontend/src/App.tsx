import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup, Signin, Create, Blogs, Blog, Index } from './pages/exports'





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<Create />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
