import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
// import Highlighter from 'react-highlight-words';
import { DremioCatalogAPI } from '../endPointsURL';
import https from 'https'


function Catalog() {

    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };


    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },

        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });


    const getCatalogApi = async () => {

        const auth = 'h767vod90aibk0e7mbvl2j788o';

        await fetch(DremioCatalogAPI, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth,
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                setData([])
            })
            .catch((err) => {
                console.log(err)
                setData([])
            });
    }

    // const getCatalogapi = async () => {

    //     const auth = 'h767vod90aibk0e7mbvl2j788o';

    //     let headers = new Headers();

    //     headers.append('Content-Type', 'application/json');
    //     headers.append('Authorization', auth);
    //     headers.append('Origin', 'http://localhost:3000');

    //     await fetch(DremioCatalogAPI, {
    //         method: 'GET',
    //         mode: 'cors',
    //         credentials: 'include',
    //         headers: headers,
    //     })
    //         .then((response) => response.json())
    //         .then((res) => {
    //             console.log(res);
    //             setData([])
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //             setData([])
    //         });
    // }

    useEffect(() => {
        getCatalogApi()
    }, [])

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'name',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Path',
            dataIndex: 'age',
            key: 'age',
            ...getColumnSearchProps('age'),
        },
        {
            title: 'Tag',
            dataIndex: 'address',
            key: 'address',
            ...getColumnSearchProps('address'),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Type',
            dataIndex: 'address',
            key: 'address',
            ...getColumnSearchProps('address'),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Container Type',
            dataIndex: 'address',
            key: 'address',
            ...getColumnSearchProps('address'),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'CreatedAt',
            dataIndex: 'address',
            key: 'address',
            ...getColumnSearchProps('address'),
            sortDirections: ['descend', 'ascend'],
        },
    ];

    return (
        <div className='container'>
            <div className='row rowmargin'>
                <div className='col-md-12'>
                    <Table
                        columns={columns}
                        dataSource={data}
                    />
                </div>
            </div>
        </div>

    );

};
export default Catalog;