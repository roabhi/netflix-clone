import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs'
import { useCallback, useState, useEffect } from 'react'

import NavbarItem from './NavbarItem'
import MobileMenu from './MobileMenu'
import AccountMenu from './AccountMenu'

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [showBackground, setShowBackground] = useState(false)

  const TOP_OFFSET = 66 // ? The height in which we will trigger the background opaity for the menu

  useEffect(() => {
    /**
     * ? Use effecct to control menu background opacity
     */

    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true)
      } else {
        setShowBackground(false)
      }
    }

    // ? listen for the scroll event

    window.addEventListener('scroll', handleScroll)

    // ? we need to remove the scroll event as for in react inside useEffect

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current)
  }, [])

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current)
  }, [])

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4
        md:px-36
        py-6
        flex
        flex-row
        items-center
        transition
        duration-500
        ${showBackground ? 'bg-zinc-900/90' : ''}
       `}
      >
        <img alt="logo" className="h-4 lg:h-7" src="/images/logo.png" />
        <div
          className=" 
        flex-row
        ml-8
        gap-7
        hidden
        lg:flex
      "
        >
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by Languages" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu ? 'rotate-180' : 'rotate-0'
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsBell />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 overflow-hidden">
              <img src="/images/default-blue.png" alt="profile" />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu ? 'rotate-180' : 'rotate-0'
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
