import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'

class Header extends Component {
    render() {
      //get the auth token from localstorage (apparently insecure)
      const authToken = localStorage.getItem(AUTH_TOKEN);

      return (
        <div className="flex pa1 justify-between nowrap orange">
          <div className="flex flex-fixed black">
            <div className="fw7 mr1">Hacker News</div>
            <Link to="/" className="ml1 no-underline black">
              new
            </Link>
            {/* if there is an authToken, then process the below link */}
            {authToken && (
              <div className="flex">
                <div className="ml1">|</div>
                <Link to="/create" className="ml1 no-underline black">
                submit
                </Link>
              </div>
            )}
          </div>
          <div className="flex flex-fixed">
              {/* If there is an authToken, it should say logout, which has logout functionality */}
              {authToken ? (
                <div className="ml1 pointer black"
                     onClick={() => {
                       localStorage.removeItem(AUTH_TOKEN);
                       this.props.history.push('/')
                     }}
                >
                logout
                </div>
              ) : (
                //no authtoken, we should put login in the top right
                <Link to="/login" className="ml1 no-underline black">
                login
                </Link>
              )}
          </div>
        </div>
      );
    };
}
export default withRouter(Header);