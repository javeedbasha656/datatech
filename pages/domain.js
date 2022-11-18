import React, { useEffect, useRef, useState } from 'react';
import {
    Button, Form, Input, Card, Modal, Switch,
    Popconfirm, Table, message, Tooltip, Space
} from 'antd';
import {
    EditOutlined, SaveOutlined,
    CloseSquareOutlined, SearchOutlined
} from '@ant-design/icons';
import styles from '../styles/Pages.module.css'
import { DomainAPIURL } from '../endPointsURL'
import Highlighter from 'react-highlight-words';


function Domain() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [editingKey, setEditingKey] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [btnLoading, setbtnLoading] = useState(false)
    const [checked, setChecked] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [windowWidth, setwindowWidth] = useState(0)
    const [form] = Form.useForm();
    const searchInput = useRef(null);

    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        const inputNode = dataIndex === 'Info_Domain_Long_Name' ? (
            <Switch
                checkedChildren="Active"
                unCheckedChildren="Inactive"
                onChange={onStatusChange}
            />) :
            (<Input
                style={{ fontSize: '12px' }}
            />);
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        rules={[
                            {
                                type: dataIndex === 'email' ? 'email' : null,
                                message: dataIndex === 'email' ? 'The input is not valid E-mail!' : null,
                            },
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    //get domain list from api function
    const getDomainApi = async () => {
        await fetch(DomainAPIURL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((res) => {
                // console.log(data);
                setData(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setData([])
                setLoading(false)
            });
    }

    //status onchange function
    const onStatusChange = (value) => {
        console.log(`switch to ${value}`);
        setChecked(value)
    };

    //function to open the modal
    const showModal = () => {
        setIsModalOpen(true);
        setLoading(true)
    };

    //function close the modal while clicking ok
    const handleOk = () => {
        setIsModalOpen(false);
    };

    //function to close the modal while clicking close
    const handleCancel = () => {
        setIsModalOpen(false);

        setTimeout(() => {
            setLoading(false)
        }, 1000)
    };

    //modal create domain submit function 
    const onFinish = (values) => {
        console.log('Success:', values, checked);
        setIsModalOpen(false)
        setbtnLoading(false)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    };

    //function to fetch error while submitting create domain forma
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    //toggle function for editing the table
    const isEditing = (record) => record.Info_Domain_Code === editingKey;
    // console.log(isEditing)

    //domain table edit function
    const edit = (record, rec) => {
        console.log('old Data:', record, 'id:', rec)
        form.setFieldsValue({
            Info_Domain_Code: '',
            Info_Domain_Long_Name: '',
            Info_Domain_Desc: '',
            ...record,
        });
        setEditingKey(record.Info_Domain_Code);
    };

    //function to cancel the edit 
    const cancel = () => {
        setEditingKey('');
    };

    //domain list to update table data 
    const save = async (id) => {
        // console.log(id)
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => id === item.Info_Domain_Code);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                const UpdatedData = newData[index]
                // console.log('Updated Data:', UpdatedData)
                onDomain(UpdatedData)
                setLoading(true)
                message.success(`Domain Code: ${id} has been successfully updates`)
                setData(newData);
                setEditingKey('');
                setLoading(false)
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
                setLoading(false)
            }
        } catch (errInfo) {
            setLoading(false)
            console.log('Validate Failed:', errInfo);
        }
    };

    //function to search the data from table
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    //function to reset the search text 
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    //function to handle the search input field while clicking search icon
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

    //domain column list
    const columns = [
        {
            key: 'Info_Domain_Code',
            title: 'Domain Code',
            dataIndex: 'Info_Domain_Code',
            ...getColumnSearchProps('Info_Domain_Code'),
            editable: true,
        },
        {
            key: 'Info_Domain_Long_Name',
            title: 'Domain Name',
            dataIndex: 'Info_Domain_Long_Name',
            ...getColumnSearchProps('Info_Domain_Long_Name'),
            editable: true,
        },
        {
            key: 'Info_Domain_Desc',
            title: 'Domain Description',
            dataIndex: 'Info_Domain_Desc',
            ...getColumnSearchProps('Info_Domain_Desc'),
            editable: true,
        },
        {
            title: 'Actions',
            // dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Tooltip placement="top" title="Save">
                            <Button
                                onClick={() => save(record.Info_Domain_Code)}
                                style={{
                                    marginRight: 8,
                                }}
                                className={styles.savebtn}
                                htmlType="submit"
                            >
                                <SaveOutlined
                                    style={{ fontSize: 14 }}
                                />
                            </Button>
                        </Tooltip>
                        <Tooltip placement="top" title="Cancel">
                            <Popconfirm
                                title="Sure to cancel?"
                                onConfirm={cancel}>
                                <Button style={{
                                    marginRight: 8,
                                    border: '1px solid #a6a4a4'
                                }}>
                                    <CloseSquareOutlined
                                        style={{ fontSize: 14 }}
                                    />
                                </Button>
                            </Popconfirm>
                        </Tooltip>
                    </span>
                ) : (
                    <Tooltip placement="top" title={'Edit'}>
                        <Button
                            disabled={editingKey !== ''}
                            className={`${styles.backBtn}`}
                            onClick={() => edit(record, record.Info_Domain_Code)}>
                            <EditOutlined />
                        </Button>
                    </Tooltip>
                );
            },
        },
    ];

    //domain column with form input merge function
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'phone' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    //domain update api function call
    const onDomain = (values) => {
        console.log('Updated Data:', values);
    };

    useEffect(() => {
        getDomainApi()
        if (typeof window !== undefined) {
            console.log(window.innerWidth)
            console.log(window.innerHeight)
            setwindowWidth(window.innerWidth)
        }
    }, [])

    return (
        <div className='container-fluid'>
            <div className='row rowmargin'>
                <div className='col-md-12'>
                    <Card
                        type={'inner'}
                        title={'Domain Master'}
                        bordered={false}
                        className={'cardLayout'}
                        style={{ marginBottom: '10px' }}
                        extra={
                            <Button type="primary"
                                className={'submitbtn'}
                                style={{ margin: '5px' }}
                                onClick={showModal}
                            > Create Domain
                            </Button>
                        }
                    >
                        <Form
                            form={form}
                            autoComplete="off"
                        >
                            <Table
                                components={{
                                    body: {
                                        cell: EditableCell,
                                    },
                                }}
                                // bordered
                                dataSource={data}
                                columns={mergedColumns}
                                loading={!loading ? false : true}
                                scroll={{
                                    x: windowWidth > 1000 ? null : 1500
                                }}
                                pagination={{
                                    defaultPageSize: 20,
                                    showSizeChanger: true,
                                    pageSizeOptions: ['20', '50']
                                }}
                            />
                        </Form>
                    </Card>
                    <Modal title="Create Domain"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={null}
                        destroyOnClose={true}
                    >
                        <div className='row'>
                            <Form
                                name="basic"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <label>Domain Code<span className="error">*</span></label>
                                        <Form.Item
                                            label={""}
                                            name="domaincode"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your Domain Code!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <label>Domain Name<span className="error">*</span></label>
                                        <Form.Item
                                            label={""}
                                            name="domainname"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your Domain Name!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <label>Domain Description<span className="error">*</span></label>
                                        <Form.Item
                                            label={""}
                                            name="domaindesc"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your Domain Description!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <label>Status</label>
                                        <Form.Item
                                            label={""}
                                            name="status"
                                        >
                                            <Switch
                                                checkedChildren="Active"
                                                unCheckedChildren="Inactive"
                                                onChange={onStatusChange}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                className={'submitbtn submitButtonAlign'}
                                                loading={btnLoading}
                                                style={{ marginBottom: 0 }}
                                            >
                                                Submit
                                            </Button>
                                        </Form.Item>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </Modal>
                </div>
            </div >
        </div >

    );
};
export default Domain;