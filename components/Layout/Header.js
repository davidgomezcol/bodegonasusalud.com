import MainNavigation from './MainNavigation';
import classes from './Header.module.css';

function Header(props) {
    return (
        <div>
            <MainNavigation/>
            <main className={classes.main}>{props.children}</main>
        </div>
    );
}

export default Header;
