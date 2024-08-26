import { Menu } from 'antd';
import { AppstoreOutlined, UserOutlined, BarcodeOutlined } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom'; // Si estás usando React Router

const Navbar = () => {
    return (
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<BarcodeOutlined />}>
                <NavLink to="/">Scanner</NavLink>
            </Menu.Item>
            <Menu.Item key="2" icon={<AppstoreOutlined />}>
                <NavLink to="/dash">Dashboard</NavLink>
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
                <NavLink to="/admin">Admin</NavLink>
            </Menu.Item>
        </Menu>
    );
};

export default Navbar;
