import React, { useState, useRef, useContext } from 'react';
import { Button, Modal } from 'antd';

import Scanner from './Scanner';
import Result from './Result';

// Importamos los iconos necesarios
import { ScanOutlined } from '@ant-design/icons'

// Importamos el context de usuario
import { UserContext } from '../../context/UserProvider';


const QuaggaScan = (props) => {

    const [scanning, setScanning] = useState(false);
    const [results, setResults] = useState([]);
    const scannerRef = useRef(null);

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    // Inilcializamos el contexto
    const {
        idUSer, setIdUSer
    } = useContext(UserContext)

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const handleDetected = (result) => {
        setResults([...results, result])
        setIdUSer(result)
        setOpen(false)
    }
    return (
        <>
            <Button
                disabled={props.isAvaiblePicklist}
                onClick={showModal}
                type='dashed'
            >
                <ScanOutlined />

            </Button>


            <Modal
                title="Scan ID"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Neh
                    </Button>
                ]}
            >
                
                <div ref={scannerRef} style={{ position: 'relative', border: '3px solid red' }}>
                    {/* <video style={{ width: 300, height: 180, border: '3px solid orange' }}/> */}
                    <canvas className="drawingBuffer" style={{
                        position: 'absolute',
                        top: '0px',
                        // left: '0px',
                        // height: '100%',
                        // width: '100%',
                        border: '3px solid green',
                    }} width="320" height="320" />
                    {/* <ul className="results">
                        {results.map((result) => (result.codeResult && <Result key={result.codeResult.code} result={result} />))}

                    </ul> */}
                    <Scanner
                        scannerRef={scannerRef}
                        onDetected={(result) => handleDetected(result)}
                    />
                </div>

            </Modal>




        </>
    );
};

export default QuaggaScan;
