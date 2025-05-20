
import { Outlet } from "react-router"
import Header from "./Header"
import Footer from "./Footer"
import { useState } from "react"
import RegisterModal from "./RegisterModal"

const Layout = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  const openRegisterModal = () => {
    setShowRegisterModal(true)
  }

  const closeRegisterModal = () => {
    setShowRegisterModal(false)
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header openRegisterModal={openRegisterModal} />
      <main className="flex-grow-1">
        <Outlet context={{ openRegisterModal }} />
      </main>
      <Footer />
      {showRegisterModal && <RegisterModal onClose={closeRegisterModal} />}
    </div>
  )
}

export default Layout