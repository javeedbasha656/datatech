import { SearchOutlined } from '@ant-design/icons';
import {
    Button, Input, Space,
    Table, Tag, Card
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { getDremioAPIURL } from '../endPointsURL';
import https from 'https'


function Catalog() {

    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [loading, setLoading] = useState(true)
    const [windowWidth, setwindowWidth] = useState(0)
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
                    {/* <Button
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
                    </Button> */}
                    {/* <Button
                        type="link"
                        size="small"
                        onClick={() => close()}
                    >
                        close
                    </Button> */}
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

        await fetch(getDremioAPIURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((res) => {
                // console.log(res);
                setData(res.catalogData)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
                setData([])
            });
    }


    const getData = data?.map((v, index) => {
        return {
            id: v.id,
            containerType: v.containerType,
            path: v.path[0],
            tag: v.tag,
            type: v.type,
            createdAt: v.createdAt
        }
    })


    useEffect(() => {
        if (typeof window !== undefined) {
            console.log(window.innerWidth)
            console.log(window.innerHeight)
            setwindowWidth(window.innerWidth)
        }
        getCatalogApi()
    }, [])


    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            ...getColumnSearchProps('id'),
            sorter: (a, b) => a.id.length - b.id.length,
            sortDirections: ['descend'],
            width: 140,

        },
        {
            title: 'Path',
            dataIndex: 'path',
            key: 'path',
            ...getColumnSearchProps('path'),
            width: 80,
        },
        {
            title: 'Tag',
            dataIndex: 'tag',
            key: 'tag',
            ...getColumnSearchProps('tag'),
            width: 80,
        },

        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            ...getColumnSearchProps('type'),
            render: function (v, record, index) {
                if (v === "CONTAINER") {
                    return <Tag color="blue">CONTAINER</Tag>
                }
                else {
                    return <Tag>{v}</Tag>
                }
            },
            width: 100,
        },
        {
            title: 'Container Type',
            dataIndex: 'containerType',
            key: 'containerType',
            ...getColumnSearchProps('containerType'),
            render: function (v, record, index) {
                if (v === "SOURCE") {
                    return <Tag color="green">SORUCE</Tag>
                }
                if (v === "SPACE") {
                    return <Tag color="cyan">SPACE</Tag>
                }
                if (v === "HOME") {
                    return <Tag color="geekblue">HOME</Tag>
                }
            },
            width: 100,
        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sortDirections: ['ascend' | 'descend'],
            sorter: (a, b) => a.createdAt.length - b.createdAt.length,
            width: 100,
        },
    ];

    return (
        <div className='container-fluid'>
            <div className='row rowmargin'>
                <div className='col-md-12'>
                    <Card
                        type={'inner'}
                        title={'Catalog Data'}
                        bordered={false}
                        className={'cardLayout'}
                        style={{ marginBottom: '10px' }}
                    >
                        <Table
                            pagination={{
                                defaultPageSize: 20,
                                showSizeChanger: true,
                                pageSizeOptions: ['20', '50']
                            }}
                            columns={columns}
                            dataSource={getData}
                            loading={!loading ? false : true}
                            scroll={{
                                x: windowWidth > 1500 ? null : 1500
                            }}
                        // sticky
                        />
                    </Card>
                </div>
            </div>
        </div>

    );

};
export default Catalog;