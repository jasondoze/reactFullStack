import { Fragment, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import './navigation.styles.scss';

// create a top level navigation component that will always be present
const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  // console.log(currentUser);
  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CrwnLogo className='logo' />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          {currentUser ? (
            <span className='nav-link' onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className='nav-link' to='/auth'>
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      {/* outlet will return everything under the navbar */}
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
