import React, { useContext } from 'react';
import { Layout, Row, Col, Button, Typography, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
const { Header } = Layout;

const { Title, Text } = Typography




const Banner = () => {

    // Consumimos el contexto de UserProvider
    const {
        user, signOutUser, modalLoginOpen, setModalLoginOpen
    } = useContext(UserContext)

    // importamos el useNAvigate
    const navigate = useNavigate()

    // HANDLE para cerrar sesion
    const handleClickLogout = async () => {

        try {
            await signOutUser()
        } catch (error) {
            console.log(error.code)
        }
    }

    return (
        <Header style={{ backgroundColor: '#001529' }}>
            <Row justify="space-between" align="middle" >
                <Col xs={20} sm={16} md={12} lg={8} xl={6}>
                    <h1 style={{ color: '#fff' }}>Admin Panel</h1>
                </Col>
                <Col xs={4} sm={8} md={12} lg={16} xl={18}>
                    <Row justify="end">
                        <Button
                            type="primary"
                            style={{ marginRight: '1rem' }}
                            onClick={() => navigate('/')}
                        >
                            <Text style={{ color: '#fff' }}>HOME</Text>
                        </Button>
                        <Popconfirm
                            title="Logout"
                            description="Are you sure to Logout?"
                            onConfirm={handleClickLogout}
                            // onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="primary" danger>
                                <Text style={{color:"#fff"}}> Logout</Text>
                            </Button>
                        </Popconfirm>
                    </Row>
                </Col>
            </Row>
        </Header>
    );
};

export default Banner;