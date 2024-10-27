import './GlobalNav.css';

const GlobalNav = () => {
    return (
        <div className='globalnav-wrapper'>
            <div className = 'globalnav-contents'>
                <a href='/main' className='logo'>boatvote</a>
                <ul className='globalnav-list'>
                    <li className='globalnav-submenu-trigger-item'>
                        <a href='/main' className='globalnav-submenu-trigger-link'>menu1</a>
                    </li>
                    <li className='globalnav-submenu-trigger-item'>
                        <a className='globalnav-submenu-trigger-link' href='/search-survey'>설문조사</a>
                    </li>
                    <li className='globalnav-submenu-trigger-item'>
                        <a className='globalnav-submenu-trigger-link'>menu1</a>
                    </li>
                </ul>
                <a href='/main' className='globalnav-submenu-trigger-link'>로그인</a>
            </div>
        </div>
    )
}

export default GlobalNav;