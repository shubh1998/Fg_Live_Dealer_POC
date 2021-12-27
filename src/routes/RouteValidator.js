import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
// import NavBar from '../components/layouts/Header/NavBar'

const RouteValidator = ({ hasNavbar, component: Component, ...props }) => {
  if (hasNavbar) {
    return (
      <>
        <Component />
        {/* <NavBar>
        </NavBar> */}
      </>
    )
  }
  return <Component />
}

RouteValidator.propTypes = {
  component: PropTypes.func.isRequired,
  hasNavbar: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired
}

export default RouteValidator
