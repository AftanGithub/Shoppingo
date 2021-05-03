import React ,{ useState } from 'react';
import { Menu,Badge } from 'antd';
import { HomeOutlined,ShoppingCartOutlined,
   UserOutlined,UserAddOutlined,SettingOutlined,
   LogoutOutlined,ShoppingOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import logo from '../../logo.png';
import '../../App.css';
import firebase from 'firebase';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Search from "../forms/Search";
const { SubMenu } = Menu;

function Header (){
    const [current,setCurrent] = useState("home");
    let dispatch = useDispatch();
    let history = useHistory();
    let {user,cart} = useSelector((state)=>({...state}));

    const handleClick = (e)=>{
        // console.log(e.key);
        setCurrent(e.key)
    };

    const logout = ()=>{
        firebase.auth().signOut();
       
        dispatch({
            type:"LOGOUT",
            payload:null,
        });
        history.push('/login');

    }
    return(
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home" icon={<HomeOutlined />}>
         <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="shop" icon={<ShoppingOutlined />}>
         <Link to="/shop">Shop</Link>
        </Menu.Item>
        <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge count={cart.length} offset={[9, 0]}>
            Cart
          </Badge>
        </Link>
        </Menu.Item>
        {!user && 
        
        (
            <Menu.Item key="login" icon={<UserOutlined />} className="float-right">
            <Link to="/login">Login</Link>
            </Menu.Item>
        )
            
        }

        {!user &&
        (
            <Menu.Item key="register" icon={<UserAddOutlined />} className="float-right">
            <Link to="/register">Register</Link>
            </Menu.Item>
        )
        }
        
        

        
        {user &&
        (
            <SubMenu key="SubMenu" icon={<SettingOutlined />} title={user.email && user.email.split('@')[0]} className="float-right">
            {user && user.role === "subscriber" && (
            <Menu.Item>
              <Link to="/user/history">Dashboard</Link>
            </Menu.Item>
          )}

          {user && user.role === "admin" && (
            <Menu.Item>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Menu.Item>
          )}
            <Menu.Item icon={<LogoutOutlined />} onClick={logout}>Logout</Menu.Item>
            </SubMenu>
        )
        
        }

        <a className="img-center" href="/">
            <img src={logo} alt="logo" className="img-center"/>
        </a>
      <span className="float-right p-1">
        <Search />
      </span>
      </Menu>
    );
}

export default Header;