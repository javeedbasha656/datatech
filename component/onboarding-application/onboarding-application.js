import React from 'react';
import {
    Button, Form, Input,
    Select, Card, Spin
} from 'antd';
import { useEffect, useState } from 'react'

const { Option } = Select;

function OnboardingApp() {

    const [domain, setDomain] = useState([])
    const [loading, setLoading] = useState(true)

    const getDomainApi = async () => {
        await fetch('/api/onboarding/getDomain', {
            method: 'GET',
            headers: {
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data.domainList);
                setDomain(data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setDomain([])
                setLoading(false)
            });
    }

    //domain onchange function
    const domainChange = (value) => {
        console.log(`Domain selected ${value}`);
    };

    //domain search function
    const domainSearch = (value) => {
        console.log('Domain search:', value);
    };

    //subdomain onchange function
    const subdomainChange = (value) => {
        console.log(`Subdomain selected ${value}`);
    };

    //subdomain search function
    const subdomainSearch = (value) => {
        console.log('Subdomain search:', value);
    };

    //status onchange function
    const statusChange = (value) => {
        console.log(`Status selected ${value}`);
    };

    //form submit function 
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    //form failure function to get issue from client side
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        getDomainApi()
    }, [])

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Card
                            type={'inner'}
                            title={'Application Details'}
                            bordered={false}
                            className={'cardLayout'}
                        >
                            <div className='row' style={{ marginTop: '30px' }}>
                                <div className='col-md-6'>
                                    <Form.Item
                                        label={<span>Domain:</span>}
                                        name="domain"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Select domain!',
                                            },
                                        ]}
                                    >
                                        <Select
                                            showSearch
                                            allowClear
                                            placeholder="Select Domain Name"
                                            optionFilterProp="children"
                                            loading={loading ? <Spin /> : null}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().includes(input.toLowerCase())}
                                            onChange={domainChange}
                                            onSearch={domainSearch}
                                        >
                                            {domain?.domainList?.map((item, index) => {
                                                return (
                                                    <Option key={index} value={item.Info_Domain_Code}>
                                                        {item.Info_Domain_Long_Name}</Option>
                                                )
                                            })}
                                        </Select>
                                    </Form.Item>
                                </div>
                                <div className='col-md-6'>
                                    <Form.Item
                                        label={<span>Sub Domain:</span>}
                                        name="subdomain"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Select subdomain!',
                                            },
                                        ]}
                                    >
                                        <Select
                                            showSearch
                                            placeholder="Select Subdomain Name"
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().includes(input.toLowerCase())}
                                            onChange={subdomainChange}
                                            onSearch={subdomainSearch}
                                        >
                                            <Option value="None">None</Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className='row' style={{ marginTop: '30px' }}>
                                <div className='col-md-6'>
                                    <Form.Item
                                        label={<span>Application Name:</span>}
                                        name="applicationname"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your application name!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                                <div className='col-md-6'>
                                    <Form.Item
                                        label={<span>Application <br /> Abbreviated Name: </span>}
                                        name="applicationabbvname"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your application abbreviated name!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className='row' style={{ marginTop: '30px' }}>
                                <div className='col-md-6'>
                                    <Form.Item
                                        label={<span>Application <br /> Description: </span>}
                                        name="applicationdescription"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your application description!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                                <div className='col-md-6'>
                                    <Form.Item
                                        label={<span>Status Code:</span>}
                                        name="status"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Select Status code!',
                                            },
                                        ]}
                                    >
                                        <Select
                                            placeholder="Select Status Code"
                                            onChange={statusChange}
                                        >
                                            <Option value={1}>Active</Option>
                                            <Option value={0}>In-active</Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                            </div>
                        </Card>
                        <Card
                            type={'inner'}
                            title={'Contact Informtion'}
                            bordered={false}
                            className={'cardLayout'}
                            style={{ marginTop: '30px' }}
                        >
                        </Card>
                        <div className='row'>
                            <div className='col-md-12'>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit"
                                        className={'submitbtn submitButtonAlign'}>
                                        Submit
                                    </Button>
                                </Form.Item>
                            </div>
                        </div>

                    </Form>

                </div>
            </div>
        </div >
    )
}

export default OnboardingApp