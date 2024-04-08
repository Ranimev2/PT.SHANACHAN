import about from "./App/about.html"
import index from "./App/index.html"



function App() {
  
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
