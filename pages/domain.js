import React, { useEffect, useState } from 'react';
import {
    Button, Form, Input, Card,
    Popconfirm, Table, message, Tooltip
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import styles from '../styles/Pages.module.css'
import { DomainAPIURL } from '../endPointsURL'

const URL = 'https://jsonplaceholder.typicode.com/users'

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
    const inputNode = <Input
        style={{ fontSize: '12px' }} />;
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

function EditTable() {
    const [form] = Form.useForm();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [editingKey, setEditingKey] = useState('');

    //function get domain list from api
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


    useEffect(() => {
        getDomainApi()
    }, [])

    const isEditing = (record) => record.Info_Domain_Code === editingKey;
    // console.log(isEditing)

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

    const cancel = () => {
        setEditingKey('');
    };

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
                onFinish(UpdatedData)
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

    const columns = [
        {
            title: 'Domain Code',
            dataIndex: 'Info_Domain_Code',
            // width: '25%',
            editable: true,
        },
        {
            title: 'Domain Name',
            dataIndex: 'Info_Domain_Long_Name',
            // width: '25%',
            editable: true,
        },
        {
            title: 'Domain Description',
            dataIndex: 'Info_Domain_Desc',
            // width: '25%',
            editable: true,
        },
        {
            title: 'Actions',
            // dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Button
                            onClick={() => save(record.Info_Domain_Code)}
                            style={{
                                marginRight: 8,
                            }}
                            htmlType="submit"
                            type="link"
                        >
                            Save
                        </Button>
                        <Popconfirm
                            title="Sure to cancel?"
                            onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
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

    const onFinish = (values) => {
        console.log('Updated Data:', values);
    };

    return (
        <div className='container'>
            <div className='row rowmargin'>
                <div className='col-md-12'>
                    <Card
                        type={'inner'}
                        title={'Domain Data'}
                        bordered={false}
                        className={'cardLayout'}
                        style={{ marginBottom: '10px' }}
                        extra={
                            <Button type="primary"
                                className={'submitbtn'}
                                style={{ margin: '5px' }}
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
                                // rowClassName="editable-row"
                                pagination={{
                                    defaultPageSize: 20,
                                    showSizeChanger: true,
                                    pageSizeOptions: ['20', '50']
                                }}
                            />
                        </Form>
                    </Card>
                </div>
            </div >
        </div >

    );
};
export default EditTable;