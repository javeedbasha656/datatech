import React from 'react';
import {
    Button, Form, Input,
    Select, Card, Spin
} from 'antd';
import { useEffect, useState } from 'react'
import { DomainAPIURL, SubDomainAPIURL } from '../../endPointsURL';
import { useRouter } from 'next/router'

const { Option } = Select;

function OnboardingApp(props) {

    const [domain, setDomain] = useState([])
    const [subdomain, setsubdomain] = useState([])
    const [selectsubdomain, setsubselectdomain] = useState(false)
    const [loading, setLoading] = useState(true)
    const [form] = Form.useForm();

    //function get domain list from api
    const getDomainApi = async () => {
        await fetch(DomainAPIURL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                setDomain(data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setDomain([])
                setLoading(false)
            });
    }

    //function get subdomain list from api
    const getSubDomainApi = async (id) => {
        // console.log(id)
        setsubdomain([])
        const value = (id === undefined) || (id === "") ? "" : id

        var obj = {
            domain: value
        }

        await fetch(SubDomainAPIURL, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                setsubdomain(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setsubdomain([])
                setLoading(false)
            });
    }

    //domain onchange function
    const domainChange = (value) => {
        setsubselectdomain(false)
        form.resetFields(["subdomain"])
        setsubdomain([])
        console.log(`Domain selected ${value}`);
        if (value === "") {
            setsubdomain([])
            setsubselectdomain(true)
            form.resetFields(["subdomain"])
        }
        else {
            getSubDomainApi(value)
            setsubselectdomain(false)
        }
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
        // form.setFieldsValue({
        //     applicationname: "default value",
        // });
    }, [])

    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <Form
                        form={form}
                        name="onboardingapplication"
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
                            <div className='row rowmargin'>
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
                                            disabled={domain.length === 0 ? true : false}
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
                                            disabled={
                                                (selectsubdomain) || (subdomain.length) === 0
                                                    ? true : false}
                                            loading={selectsubdomain === false ? false : true}
                                            placeholder="Select Subdomain Name"
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().includes(input.toLowerCase())}
                                            onChange={subdomainChange}
                                            onSearch={subdomainSearch}
                                        >
                                            {subdomain?.map((sub, index) => {
                                                return (
                                                    <Option key={index}
                                                        value={sub.Info_SubDomain_Code}>
                                                        {sub.Info_SubDomain_Long_Name}</Option>
                                                )
                                            })}
                                        </Select>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className='row rowmargin'>
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
                            <div className='row rowmargin'>
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
                            className={'cardLayout rowmargin'}
                        >
                            <div className='row rowmargin'>
                                <div className='col-md-6'>
                                    <Form.Item
                                        label={<span>Primary Contact <br /> Name: </span>}
                                        name="primaryname"
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                                <div className='col-md-6'>
                                    <Form.Item
                                        label={<span>Primary Email <br /> Address: </span>}
                                        name="primaryemail"
                                        rules={[
                                            {
                                                type: 'email',
                                                message: 'Please input correct email address',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className='row rowmargin'>
                                <div className='col-md-6'>
                                    <Form.Item
                                        label={<span>Secondary Contact <br /> Name: </span>}
                                        name="secondaryname"
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                                <div className='col-md-6'>
                                    <Form.Item
                                        label={<span>Secondary Email <br /> Address: </span>}
                                        name="secondaryemail"
                                        rules={[
                                            {
                                                type: 'email',
                                                message: 'Please input correct email address',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className='row rowmargin'>
                                <div className='col-md-6'>
                                    <Form.Item
                                        label={<span>Primary Contact <br /> Number: </span>}
                                        name="primarynumber"
                                        rules={[
                                            {
                                                pattern: /^(\+{1}\d{2,3}\s?[(]{1}\d{1,3}[)]{1}\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}$/,
                                                message: 'Please input the number!'
                                            },
                                            {
                                                min: 10,
                                                message: 'Primary Contact number should contain atleast 10 digits'
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                                <div className='col-md-6'>
                                    <Form.Item
                                        label={<span>Secondary Contact <br /> Number: </span>}
                                        name="secondarynumber"
                                        rules={[
                                            {
                                                pattern: /^(\+{1}\d{2,3}\s?[(]{1}\d{1,3}[)]{1}\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}$/,
                                                message: 'Please input the number!'
                                            },
                                            {
                                                min: 10,
                                                message: 'Secondary Contact number should contain atleast 10 digits'
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className='row rowmargin'>
                                <div className='col-md-6'>
                                    <Form.Item
                                        label={<span>IT Support Email <br /> Address: </span>}
                                        name="itsupportemail"
                                        rules={[
                                            {
                                                type: 'email',
                                                message: 'Please input correct email address',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                            </div>
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