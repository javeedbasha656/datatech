import React, { useEffect, useRef, useState } from 'react';
import {
    Button, Form, Input, Card, Modal, Switch,
    Popconfirm, Table, message, Tooltip, Space, Tag,
    Drawer, Badge, Empty, Dropdown, Menu, Select
} from 'antd';
import {
    EditOutlined, SaveOutlined,
    CloseSquareOutlined, SearchOutlined
} from '@ant-design/icons';
import styles from '../styles/Pages.module.css'
import {
    DomainAPIURL, AddDomainAPIURL,
    EditDomainAPIURL, SubDomainAPIURL,
    AddSubdomainAPIURL
} from '../endPointsURL'
import { PlusOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import _ from 'lodash'


const { Option } = Select;

function Domain() {

    const [data, setData] = useState([]);
    const [subdata, setsubData] = useState([])
    const [domId, setDomId] = useState('')
    const [loading, setLoading] = useState(true)
    const [subloading, setsubloading] = useState(true)
    const [subbtnloading, setsubbtnloading] = useState(false)
    const [editingKey, setEditingKey] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subModalOpen, setsubModalOpen] = useState(false);
    const [btnLoading, setbtnLoading] = useState(false)
    const [checked, setChecked] = useState(false)
    const [subchecked, setsubChecked] = useState(false)
    const [openDrawer, setOpendrawer] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [windowWidth, setwindowWidth] = useState(0)

    //hooks function variable
    const [form] = Form.useForm();
    const searchInput = useRef(null);


    //domain editable function to call when clicking to change the table data into input field
    const EditableDomainCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        const inputNode = dataIndex === 'Active_Ind_YN' ? null :
            <Input
                style={{ fontSize: '12px' }}
            />
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
                                required: dataIndex === 'Active_Ind_YN' ? false : true,
                                message: dataIndex === 'Active_Ind_YN' ? null : `Please Input ${title}!`
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

    //subdomain editable function to call when clicking to change the table data into input field
    const EditableSubdomainCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        const inputNode = dataIndex === 'Active_Ind_YN' ? null :
            <Input
                style={{ fontSize: '12px' }}
            />
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
                                required: dataIndex === 'Active_Ind_YN' ? false : true,
                                message: dataIndex === 'Active_Ind_YN' ? null : `Please Input ${title}!`
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
                // console.log(res);
                const resdata = res.data
                // const sortedData = resdata.sort((a, b) => new Date(b.Creation_TimeStamp) - new Date(a.Creation_TimeStamp))
                // console.log(sortedData)
                setData(resdata)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setData([])
                setLoading(false)
            });
    }

    //function to open the add domain modal
    const showModal = () => {
        setIsModalOpen(true);
        setLoading(true)
    };

    //function to open the add subdomain modal
    const showSubModal = () => {
        setsubModalOpen(true);
        setLoading(true)
    };

    //function close the add domain modal
    const handleOk = () => {
        setIsModalOpen(false);
    };

    //function to close the add domain modal 
    const handleCancel = () => {
        setIsModalOpen(false);

        setTimeout(() => {
            setLoading(false)
        }, 1000)
    };

    //function close the add subdomain modal 
    const handleOpen = () => {
        setsubModalOpen(false);
    };

    //function to close the modal while clicking close
    const handleClose = () => {
        setsubModalOpen(false);

        setTimeout(() => {
            setLoading(false)
        }, 1000)
    };

    const addDomainApi = async (value) => {
        console.log(value)
        setbtnLoading(true)

        const obj = {
            domainCode: value.domaincode,
            domainName: value.domainname,
            domainDesc: value.domaindesc,
            isActive: 'Y',
            userId: "user@wbg.org"
        }

        await fetch(AddDomainAPIURL, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.status === 'Failed') {
                    console.log(res);
                    setIsModalOpen(true)
                    setbtnLoading(false)
                    message.error(res.message)
                } else {
                    console.log(res);
                    setIsModalOpen(false)
                    message.success("Domain created successfully")
                    setbtnLoading(false)
                    getDomainApi()
                    form.resetFields();
                }
            })
            .catch((err) => {
                console.log(err.message)
                setbtnLoading(false)
                setLoading(false)
                message.error(err.message)
            });
    }

    //modal create domain submit function 
    const onFinish = (values) => {
        setLoading(true)
        // console.log('Success:', values, checked);
        addDomainApi(values)
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    };

    //function to fetch error while submitting create domain forma
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    //toggle function for editing the table
    const isEditing = (record) => record.Domain_Code === editingKey;

    //domain table edit function
    const edit = (record, rec) => {
        console.log('old Data:', record, 'id:', rec)
        form.setFieldsValue({
            Domain_Code: '',
            Domain_Long_Name: '',
            Domain_Desc: '',
            ...record,
        });
        setEditingKey(record.Domain_Code);
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
            const index = newData.findIndex((item) => id === item.Domain_Code);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                const UpdatedData = newData[index]
                // console.log('Updated Data:', UpdatedData)
                setLoading(true)
                updateDomainApi(UpdatedData)
                // message.success(`Domain Code: ${id} has been successfully updates`)
                setData(newData);
                getDomainApi()
                setEditingKey('');
                setLoading(true)
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
        setData(data)
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

    //function to call master subdomain api with domain code
    const getSubDomainApi = async (domid) => {
        // console.log(domid)
        setsubloading(true)
        const value = (domid === undefined) || (domid === "") ? "" : domid

        await fetch(`${SubDomainAPIURL}?domain=${value}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                setsubData(res.data)
                setsubloading(false)
            })
            .catch((err) => {
                console.log(err)
                setsubData([])
                setsubloading(false)
            });
    }

    const domainActivedata = _.filter(data, { 'Active_Ind_YN': 'Y' });
    // console.log(domainActivedata)

    //domain change function to get the domain code
    const domainChange = (value) => {
        console.log(`Domain selected ${value}`);
    };

    //function to open the drawer and trigger the subdomain api
    const showDrawer = (domid, data) => {
        // console.log(domid, data)
        setDomId(domid)
        getSubDomainApi(domid)
        setOpendrawer(true);
    };

    //function to close the drawer
    const onClose = () => {
        setOpendrawer(false);
        setsubData([])
    };

    //domain column list
    const columns = [
        {
            key: 'Domain_Code',
            title: 'Domain Code',
            dataIndex: 'Domain_Code',
            ...getColumnSearchProps('Domain_Code'),
            editable: false,
            width: 100,
            render: (text, record) => {
                // console.log(text, record)
                return (
                    <Tooltip placement='top'
                        title={'View Subdomain'}>
                        <a onClick={() => showDrawer(text, record)}>
                            {text}</a>
                    </Tooltip>
                )
            }
        },
        {
            key: 'Domain_Long_Name',
            title: 'Domain Name',
            dataIndex: 'Domain_Long_Name',
            ...getColumnSearchProps('Domain_Long_Name'),
            editable: true,
            width: 100,
        },
        {
            key: 'Domain_Desc',
            title: 'Domain Description',
            dataIndex: 'Domain_Desc',
            ...getColumnSearchProps('Domain_Desc'),
            editable: true,
            width: 100,
        },
        {
            key: 'Active_Ind_YN',
            title: 'Change Status',
            dataIndex: 'Active_Ind_YN',
            editable: true,
            width: 100,
            render: function (status, record, index) {
                // console.log(v, record)
                const onToggle = (check) => {
                    // console.log(checked)
                    status = check;
                    setChecked(status)
                    const text = status === true ? 'Active' : 'Inactive'
                    updateDomainStatusApi(record, status)
                    message.success(`Domain Code: ${record.Domain_Code} changed to ${text}`)
                };

                return (
                    <Tooltip
                        title={status === 'Y' ? "Active" : "Inactive"}
                        placement="top">
                        <Switch
                            checkedChildren={'Active'}
                            unCheckedChildren={'Inactive'}
                            onChange={onToggle}
                            checked={status === 'Y' ? true : false}
                        />
                    </Tooltip>
                )
            }
        },
        {
            title: 'Actions',
            fixed: 'right',
            width: 100,
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Tooltip placement="top" title="Save">
                            <Button
                                onClick={() => save(record.Domain_Code)}
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
                            onClick={() => edit(record, record.Domain_Code)}>
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
                inputType: col.dataIndex,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    //domain update api function call
    const updateDomainApi = async (values) => {
        setLoading(true)
        console.log('Updated Data:', values, status);

        const obj = {
            domainCode: values.Domain_Code,
            domainName: values.Domain_Long_Name,
            domainDesc: values.Domain_Desc,
            isActive: checked === false ? 'N' : 'Y',
            userId: "user@wbg.org"
        }

        await fetch(EditDomainAPIURL, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.status === 'Failed') {
                    console.log(res);
                    setLoading(false)
                    message.error(res.message)
                } else {
                    console.log(res);
                    message.success("Domain Edited successfully")
                    getDomainApi()
                    setTimeout(() => {
                        setLoading(false)
                    }, 1500)
                    form.resetFields();
                }
            })
            .catch((err) => {
                console.log(err.message)
                setbtnLoading(false)
                setLoading(false)
                message.error(err.message)
            });
    };

    //domain status update api function call
    const updateDomainStatusApi = async (values, status) => {
        setLoading(true)
        console.log('Updated Data:', values, status);

        const obj = {
            domainCode: values.Domain_Code,
            domainName: values.Domain_Long_Name,
            domainDesc: values.Domain_Desc,
            isActive: status === false ? 'N' : 'Y',
            userId: "user@wbg.org"
        }

        await fetch(EditDomainAPIURL, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.status === 'Failed') {
                    console.log(res);
                    setLoading(false)
                    message.error(res.message)
                } else {
                    console.log(res);
                    message.success("Domain Edited successfully")
                    getDomainApi()
                    setTimeout(() => {
                        setLoading(false)
                    }, 500)
                    form.resetFields();
                }
            })
            .catch((err) => {
                console.log(err.message)
                setbtnLoading(false)
                setLoading(false)
                message.error(err.message)
            });
    };

    //render the subdomain data list while clicking the domain code
    const subdomainColoumns = [
        // {
        //     title: 'Domain Code',
        //     dataIndex: 'Domain_Code',
        //     key: 'Domain_Code',
        //     render: (text) => <a>{text}</a>,
        //     ...getColumnSearchProps('Domain_Code'),
        // },
        {
            title: 'Subdomain Code',
            dataIndex: 'SubDomain_Code',
            key: 'SubDomain_Code',
            ...getColumnSearchProps('SubDomain_Code'),
        },
        {
            title: 'Subdomain Name',
            dataIndex: 'SubDomain_Long_Name',
            key: 'SubDomain_Long_Name',
            ...getColumnSearchProps('SubDomain_Long_Name'),
        },
        {
            title: 'Subdomain Description',
            dataIndex: 'SubDomain_Desc',
            key: 'SubDomain_Desc',
            ...getColumnSearchProps('SubDomain_Desc'),
        },
        {
            key: 'Active_Ind_YN',
            title: 'Change Status',
            dataIndex: 'Active_Ind_YN',
            editable: true,
            width: 100,
            render: function (status, record) {
                // console.log(status, record)
                const onToggle = (check) => {
                    // console.log(checked)
                    status = check;
                    setsubChecked(status)
                    const statuscheck = status === true ? 'Active' : 'Inactive'
                    // message.success(`Subdomain Code: ${record.SubDomain_Code} changed to ${statuscheck}`)
                };

                return (
                    <Tooltip
                        title={status === 'Y' ? "Active" : "Inactive"}
                        placement="top">
                        <Switch
                            checkedChildren={'Active'}
                            unCheckedChildren={'Inactive'}
                            onChange={onToggle}
                            checked={status === 'Y' ? true : false}
                        />
                    </Tooltip>
                )
            }
        },
    ]

    //function to add subdomain api integration
    const addSubDomainData = async (value) => {
        console.log(value)
        setsubbtnloading(true)

        const obj = {
            domainCode: value.domaincode,
            subDomainCode: value.subdomaincode,
            subDomainName: value.subdomainname,
            subDomainDesc: value.subdomaindesc,
            isActive: 'Y',
            userId: "user@wbg.org"
        }

        await fetch(AddSubdomainAPIURL, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.status === 'Failed') {
                    console.log(res);
                    setsubModalOpen(true)
                    setsubbtnloading(false)
                    setLoading(false)
                    message.error(res.message)
                } else {
                    console.log(res);
                    setsubModalOpen(false)
                    message.success("Subdomain created successfully")
                    setsubbtnloading(false)
                    setLoading(false)
                    getSubDomainApi()
                    form.resetFields();
                }
            })
            .catch((err) => {
                console.log(err.message)
                setsubbtnloading(false)
                setLoading(false)
                message.error(err.message)
            });
    }

    //function to submit the add subdomain form data  
    const submitSubdomain = (values) => {
        // console.log(values)
        addSubDomainData(values)
    }

    //total subdomain length value
    const subtotal = subdata.length === 0 ? 0 : subdata.length

    //dropdown menu to list the items in add button
    const menu = (
        <Menu onSelect={(e) => console.log(e)}>
            <Menu.Item>
                <a onClick={showModal} rel="noopener noreferrer">
                    Add Domain
                </a>
            </Menu.Item>
            <Menu.Item>
                <a onClick={showSubModal} rel="noopener noreferrer">
                    Add Subdomain
                </a>
            </Menu.Item>
        </Menu>
    );

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
                        title={'Master Data'}
                        bordered={false}
                        className={'cardLayout'}
                        style={{ marginBottom: '10px' }}
                        extra={
                            <Dropdown
                                overlay={menu}
                                trigger={['click']}
                                placement="bottomLeft"
                            >
                                <Button
                                    type='primary'
                                    className="submitbtn"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <PlusOutlined /> Add
                                </Button>
                            </Dropdown>
                        }
                    >
                        <Form
                            form={form}
                            autoComplete="off"
                        >
                            <Table
                                components={{
                                    body: {
                                        cell: EditableDomainCell,
                                    },
                                }}
                                // bordered
                                dataSource={data}
                                columns={mergedColumns}
                                loading={loading}
                                scroll={{
                                    x: windowWidth > 700 ? null : 1500
                                }}
                                pagination={{
                                    defaultPageSize: 20,
                                    showSizeChanger: true,
                                    pageSizeOptions: ['20', '50']
                                }}
                            />
                        </Form>
                    </Card>

                    {/* add domain drawer form */}
                    <Drawer title="Create Domain"
                        open={isModalOpen}
                        placement="right"
                        width={350}
                        onClose={handleCancel}
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
                    </Drawer>

                    {/* add subdomain drawer form */}
                    <Drawer title="Create Subdomain"
                        open={subModalOpen}
                        placement="right"
                        width={350}
                        onClose={handleClose}
                        destroyOnClose={true}
                    >
                        <div className='row'>
                            <Form
                                name="basic"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={submitSubdomain}
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
                                            <Select
                                                showSearch
                                                disabled={domainActivedata.length === 0 ? true : false}
                                                placeholder="Select Domain Name"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().includes(input.toLowerCase())}
                                                onChange={domainChange}
                                            >
                                                {domainActivedata?.map((item, index) => {
                                                    return (
                                                        <Option key={index} value={item.Domain_Code}>
                                                            {item.Domain_Long_Name}</Option>
                                                    )
                                                })}
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <label>Subdomain Code<span className="error">*</span></label>
                                        <Form.Item
                                            label={""}
                                            name="subdomaincode"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your Subdomain code!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <label>Subdomain Name<span className="error">*</span></label>
                                        <Form.Item
                                            label={""}
                                            name="subdomainname"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your Subdomain Name!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <label>Subdomain Description<span className="error">*</span></label>
                                        <Form.Item
                                            label={""}
                                            name="subdomaindesc"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your Subdomain Description!',
                                                },
                                            ]}
                                        >
                                            <Input />
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
                                                loading={subbtnloading}
                                                style={{ marginBottom: 0 }}
                                            >
                                                Submit
                                            </Button>
                                        </Form.Item>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </Drawer>

                    {/* modal to check the subdomain master detail */}
                    <Modal
                        title={<span>SubDomain data list for domain code: <b><Tag>{domId}</Tag></b>
                        </span>}
                        placement="left"
                        width={700}
                        onCancel={onClose}
                        open={openDrawer}
                        footer={null}
                        destroyOnClose={true}
                    >
                        <Card
                            type={'inner'}
                            title={<span>
                                Total subdomain list: <Badge
                                    showZero
                                    count={subtotal} />
                            </span>}
                            bordered={false}
                            className={'cardLayout'}
                            style={{ marginBottom: '10px' }}
                        >
                            <Table
                                columns={subdomainColoumns}
                                components={{
                                    body: {
                                        cell: EditableSubdomainCell,
                                    },
                                }}
                                locale={{
                                    emptyText: (
                                        <Empty
                                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                            imageStyle={{
                                                height: 60,
                                            }}
                                            description={
                                                <span>
                                                    No subdomain data found
                                                </span>
                                            }
                                        />
                                    )
                                }}
                                dataSource={subdata}
                                loading={subloading}
                            />
                        </Card>


                    </Modal>
                </div>
            </div >
        </div >

    );
};
export default Domain;