import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Cookies from 'universal-cookie'
import { Home } from '../pages/Home/Home'
// import NavBar from '../components/layouts/Header/NavBar'

const RouteValidator = ({ hasNavbar, component: Component, ...props }) => {
  const cookies = new Cookies()
  const userId = cookies.get('userId')
  if (hasNavbar && userId) {
    return (
      <>
        <Component />
        {/* <NavBar>
        </NavBar> */}
      </>
    )
  }
  return <Home />
}

RouteValidator.propTypes = {
  component: PropTypes.elementType.isRequired,
  hasNavbar: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired
}

export default RouteValidator
