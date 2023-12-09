import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
import auth from './../auth/auth-helper'
import { Link, withRouter } from 'react-router-dom'
import CartIcon from '@material-ui/icons/ShoppingCart'
import Badge from '@material-ui/core/Badge'
import cart from './../cart/cart-helper'
//import TextField from '@material-ui/core/TextField'
import Logo from './../assets/images/unicornbikeImg.jpg'

const isActive = (history, path) => {
  if (history.location.pathname == path)
    return { color: '#bef67a' }
  else
    return { color: '#ffffff' }
}
const isPartActive = (history, path) => {
  if (history.location.pathname.includes(path))
    return { color: '#bef67a' }
  else
    return { color: '#ffffff' }
}
const Menu = withRouter(({ history }) => (
  <AppBar position="static">
    <Toolbar style={{ height: '130px' }}>
      <img src={Logo} alt="Logo" style={{ marginRight: '10px', height: '130px' }} />
      <Typography variant="h4" color="inherit">
        Shoe Locker
      </Typography>
      <div>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive(history, "/")}>
            <HomeIcon />
          </IconButton>
        </Link>
        {/* <Link to="/shops/NA">
          <Button style={{ ...isActive(history, "/shops/all"), fontSize: "25px", important: "true", fontWeight: "bold" }}>Product</Button>
        </Link> */}
        <Link to="/shops/all">
          <Button style={{ ...isActive(history, "/shops/all"), fontSize: "25px", important: "true", fontWeight: "bold" }}>Shops</Button>
        </Link>
        {/* <TextField
          type="text"
          label="Search"
          margin="dense"
          variant="outlined"
          style={{
            marginLeft: '10px',
            width: '200px',
            backgroundColor: 'white',
          }}
        />
        <Link to="/shops/NA">
          <Button style={isActive(history, "/shops/all")}>Search</Button>
        </Link> */}
      </div>
      <div style={{ 'position': 'absolute', 'right': '10px' }}><span style={{ 'float': 'right' }}>
        {
          !auth.isAuthenticated() && (<span>
            <Link to="/cart">
              <Button style=
              {{ ...isActive(history, "/cart"), fontSize: "25px", important: "true", fontWeight: "bold" }}>Cart

                <Badge color="secondary" invisible={false} badgeContent={cart.itemTotal()} style={{ 'marginLeft': '7px' }}>
                  <CartIcon />
                </Badge>
              </Button>
            </Link>
            <Link to="/signup">
              <Button style=
              {{ ...isActive(history, "/signup"), fontSize: "25px", important: "true" , fontWeight: "bold"}}>Sign up
              </Button>
            </Link>
            <Link to="/signin">
              <Button style=
              {{ ...isActive(history, "/signin"), fontSize: "25px", important: "true", fontWeight: "bold" }}>Sign In

              </Button>
            </Link>
          </span>)
        }
        {
          auth.isAuthenticated() && (
            <span>
              {auth.isAuthenticated().user && auth.isAuthenticated().user.seller && (
                <Link to="/seller/shops">
                  <Button style={isPartActive(history, "/seller/")}>My Shops</Button>
                </Link>
              )}
              <Link to={"/user/" + auth.isAuthenticated().user._id}>
                <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>
                  My Profile
                </Button>
              </Link>
              <Button
                color="inherit"
                onClick={() => {
                  auth.clearJWT(() => history.push('/'))
                }}
              >
                Sign out
              </Button>
            </span>
          )
        }
      </span></div>
    </Toolbar>
  </AppBar>
))

export default Menu
