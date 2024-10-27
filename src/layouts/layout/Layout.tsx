import GlobalNav from "../globalNav/GlobalNav";
import './Layout.css';
const Layout = (props: {
    children: React.ReactNode
}) =>{
    return(
        <div>
            <GlobalNav/>
            <div>
                {props.children}
            </div>
        </div>
    )
}

export default Layout;
