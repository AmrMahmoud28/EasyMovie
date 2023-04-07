import React, { useContext } from 'react'
import {Route , Switch, Redirect} from 'react-router-dom';

import Home from '../pages/home/Home';
import Catalog from '../pages/catalog/Catalog'
import Detail from '../pages/details/Detail'
import Watch from '../pages/watch/Watch';
import ScrollToTop from './ScrollToTop';
import SignUp from '../pages/sign-up/SignUp';
import SignIn from '../pages/sign-in/SignIn';
import Account from '../pages/account/Account';
import { AuthContext } from '../authContext/AuthContext';

const Routes = () => {
    const {user} = useContext(AuthContext);

  return (
    <ScrollToTop>
        <Switch>
            <Route path='/movie/:category/search/:keyword'>
                {user? <Catalog/> : <Redirect to="/login"/>}
            </Route>

            <Route path='/detail/:id'>
                {user? <Detail/> : <Redirect to="/login"/>}
            </Route>

            <Route path='/watch/:movieName'>
                {user? <Watch/> : <Redirect to="/login"/>}
            </Route>

            <Route path='/movie/:category'>
                {user? <Catalog/> : <Redirect to="/login"/>}
            </Route>

            <Route path='/register'>
                {!user? <SignUp/> : <Redirect to="/"/>}
            </Route>

            <Route path='/login'>
                {!user? <SignIn/> : <Redirect to="/"/>}
            </Route>

            <Route path='/account'>
                {user? <Account/> : <Redirect to="/login"/>}
            </Route>

            <Route path='/' exact>
                {user? <Home/> : <Redirect to="/login"/>}
            </Route>
        </Switch>
    </ScrollToTop>
  )
}

export default Routes