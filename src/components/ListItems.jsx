import React, { useContext } from 'react'
import { Avatar, Divider, List, Popconfirm, Skeleton } from 'antd';
import { UserContext } from '../context/UserProvider';

import InfiniteScroll from 'react-infinite-scroll-component';


const ListItems = ({ type, data, handleEdit }) => {

    // traemos el context para editarlo
    const {
        servicios, setServicios,
        reviews, setReviews
    } = useContext(UserContext)

    // Delete service fromcontext
    const handleDeleteService = (id) => {
        console.log(id)
        try {
            if (type === 'services') {
                setServicios(servicios.filter(item => item.id !== id))
            } else if (type === 'reviews') {
                setReviews(reviews.filter(item => item.id !== id))
            }
        } catch (error) {
            console.log('Error al eliminar servicio:', error)
        }



    }

    return (
        <div
            id="scrollableDiv"
            style={{
                height: 250,
                overflow: 'auto',
                padding: '0 16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
        >

            <InfiniteScroll
                dataLength={data.length}
                next={data}
                hasMore={data.length < 50}
                // loader={
                //     <Skeleton
                //         avatar
                //         paragraph={{
                //             rows: 1,
                //         }}
                //         active
                //     />
                // }
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >

                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item, index) => (
                        <List.Item
                            actions={[
                                // <Popconfirm
                                //     title="Edit Servicio"
                                //     description="¿Edit service?"
                                //     onConfirm={() => handleEdit(item)}
                                //     // onCancel={cancel}
                                //     okText="Yes"
                                //     cancelText="No"
                                // >
                                //     <a
                                //         key="list-loadmore-edit"
                                //     >
                                //         edit
                                //     </a>
                                // </Popconfirm>,
                                <Popconfirm
                                    title="Eliminar Servicio"
                                    description="¿Estas seguro que quieres eliminar este servicio?"
                                    onConfirm={() => handleDeleteService(item.id)}
                                    // onCancel={cancel}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <a
                                        key="list-loadmore-more"
                                    >
                                        delete
                                    </a>
                                </Popconfirm>
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.imageURL} />}
                                title={<p>{item.title}</p>}
                                description={item.desc}
                            />
                        </List.Item>
                    )}
                />

            </InfiniteScroll>

        </div>
    )
}

export default ListItems





