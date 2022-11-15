import React, { useState, useEffect } from 'react';
import { useStepsForm } from 'sunflower-antd';
import {
    Steps, Input, Button, Form,
    Result, Select, message, Empty, Card, Spin
} from 'antd';
import Router from 'next/router'
import { DomainAPIURL, SubDomainAPIURL } from '../../endPointsURL';
// import styles from './OnboardingStepForm.module.css'
// import { TestUserAPI } from '../../endPointsURL';

const { Step } = Steps;

const { Option } = Select;


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 24,
    },
};


function OnboardingTopicForm(props) {

    const [domain, setDomain] = useState([])
    const [subdomain, setsubdomain] = useState([])
    const [selectsubdomain, setsubselectdomain] = useState(false)
    const [subloading, setsubloading] = useState(false)
    const [loading, setLoading] = useState(true)


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
        setsubloading(true)
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
                setsubloading(false)
            })
            .catch((err) => {
                console.log(err)
                setsubdomain([])
                setsubloading(false)
            });
    }

    //domain onchange function
    const domainChange = (value) => {
        setsubloading(true)
        setsubselectdomain(false)
        form.resetFields(["subdomain"])
        setsubdomain([])
        console.log(`Domain selected ${value}`);
        if (value === "") {
            setsubdomain([])
            setsubselectdomain(true)
            setsubloading(false)
            form.resetFields(["subdomain"])
        }
        else {
            getSubDomainApi(value)
            setsubloading(false)
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

    const appChange = (value) => {
        console.log(value)
    }

    const appSearch = (value) => {
        console.log(value)
    }

    useEffect(() => {
        getDomainApi()
    }, [])


    const submitTopicApi = async (value) => {
        console.log("Submitted values:", value)
    }


    const {
        form,
        current,
        gotoStep,
        stepsProps,
        formProps,
        submit,
        formLoading,
    } = useStepsForm({
        async submit(values) {
            try {
                if (values.length !== 0) {
                    // console.log(values);
                    submitTopicApi(values)
                    setTimeout(() => {
                        Router.push('/')
                        message.success('Your data is saved and pushed to database');
                    }, 3000)
                    return 'ok';
                }
            }
            catch (err) {
                console.log(err)
                message.danger('Something error has found');
            }
        },
        total: 5,
        isBackValidate: false
    });

    const formList = [
        <Card
            type="inner"
            title="Step 1"
            bordered={false}
            className={'cardLayout'}
        >
            <div className='row rowmargin'>
                <div className='col-md-6'>
                    <label>Domain<span className="error">*</span></label>
                    <Form.Item
                        label=""
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
                    <label>Sub Domain<span className="error">*</span></label>
                    <Form.Item
                        label=""
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
                            loading={subloading ? <Spin /> : null}
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
                    <label>App Code<span className="error">*</span></label>
                    <Form.Item
                        label=""
                        name="appcode"
                        rules={[
                            {
                                required: true,
                                message: 'Please Select app!',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            // disabled={domain.length === 0 ? true : false}
                            placeholder="Select App Code"
                            optionFilterProp="children"
                            // loading={loading ? <Spin /> : null}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().includes(input.toLowerCase())}
                            onChange={appChange}
                            onSearch={appSearch}
                        >
                            <Option value={0}>App Code1</Option>
                            <Option value={1}>App Code2</Option>
                        </Select>
                    </Form.Item>
                </div>
                <div className='col-md-6'>

                </div>
            </div>
            <div className='row'>
                <div className='col-md-6'></div>
                <div className='col-md-6'>
                    <Form.Item>
                        <Button
                            type="primary"
                            className={'submitbtn submitButtonAlign'}
                            onClick={() =>
                                gotoStep(current + 1)}>Next</Button>
                    </Form.Item>
                </div>
            </div>
        </Card>,
        <Card
            type="inner"
            title="Step 2"
            bordered={false}
            className={'cardLayout'}
        >
            <div className='row rowmargin'>
                <div className='col-md-12'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <label>First Name<span className='error'>*</span></label>
                            <Form.Item
                                // className={styles.labelCenter}
                                label=""
                                name="firstname"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input firstname',
                                    },
                                ]}
                            >
                                <Input placeholder="Username" />
                            </Form.Item>
                        </div>
                        {/* <div className='col-md-6'>
                            <Form.Item
                                label={<span>Person:</span>}
                                name="person"
                                // className={styles.labelCenter}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input person',
                                    },
                                ]}>
                                <Select
                                    showSearch
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onSearch={onSearch}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().includes(input.toLowerCase())}
                                >
                                    {user.length != 0 ? (
                                        <>
                                            {user?.map((list) => {
                                                return (
                                                    <Option key={list.id}>{list.username}</Option>
                                                )
                                            })}
                                        </>
                                    ) : (
                                        <>
                                            <Empty />
                                        </>
                                    )}
                                </Select>
                            </Form.Item>
                        </div> */}
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <Form.Item>
                                <Button
                                    className={'backbtnAlign backBtn'}
                                    onClick={() => gotoStep(current - 1)}
                                    style={{ marginRight: 10 }}>
                                    Prev</Button>
                            </Form.Item>
                        </div>
                        <div className='col-md-6'>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    className={'submitbtn submitButtonAlign'}
                                    onClick={() => gotoStep(current + 1)}>
                                    Next</Button>
                            </Form.Item>
                        </div>
                    </div>
                </div>
            </div>
        </Card>,

        <Card
            type="inner"
            title="Step 3"
            bordered={false}
            className={'cardLayout'}
        >
            <div className='row'>
                <div className='col-md-6'>
                    <label>Address<span className='error'>*</span></label>
                    <Form.Item
                        label=""
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input address',
                            },
                        ]}
                    >
                        <Input placeholder="Address" />
                    </Form.Item>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-6'>
                    <Form.Item>
                        <Button
                            className={'backbtnAlign backBtn'}
                            onClick={() => gotoStep(current - 1)}
                            style={{ marginRight: 10 }}>
                            Prev</Button>
                    </Form.Item>
                </div>
                <div className='col-md-6'>
                    <Form.Item>
                        <Button
                            type="primary"
                            className={'submitbtn submitButtonAlign'}
                            onClick={() => gotoStep(current + 1)}
                        >
                            Next
                        </Button>
                    </Form.Item>
                </div>
            </div>,
        </Card>,

        <Card
            type="inner"
            title="Step 3"
            bordered={false}
            className={'cardLayout'}
        >
            <div className='row'>
                <div className='col-md-6'>
                    <label>State<span className='error'>*</span></label>
                    <Form.Item
                        label=""
                        name="state"
                        rules={[
                            {
                                required: true,
                                message: 'Please input state',
                            },
                        ]}
                    >
                        <Input placeholder="State" />
                    </Form.Item>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-6'>
                    <Form.Item>
                        <Button
                            className={'backbtnAlign backBtn'}
                            onClick={() => gotoStep(current - 1)}
                            style={{ marginRight: 10 }}>
                            Prev</Button>
                    </Form.Item>
                </div>
                <div className='col-md-6'>
                    <Form.Item>
                        <Button
                            type="primary"
                            className={'submitbtn submitButtonAlign'}
                            loading={formLoading}
                            onClick={() => {
                                submit().then(result => {
                                    if (result === 'ok') {
                                        gotoStep(current + 1);
                                    }
                                });
                            }}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </div>
            </div>,
        </Card>,
    ];

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='rowmargin'>
                        <Card
                            bordered={false}
                            title={null}
                            className={'cardLayout'}
                        >
                            <Steps {...stepsProps} type="navigation">
                                <Step title="Step 1" />
                                <Step title="Step 2" />
                                <Step title="Step 3" />
                                <Step title="Step 4" />
                            </Steps>
                        </Card>

                        <div style={{ marginTop: '30px' }}>
                            <Form {...layout} {...formProps} >
                                {formList[current]}
                            </Form>

                            {current === 4 && (
                                <Card
                                    bordered={false}
                                    title={null}
                                    className={'cardLayout'}>
                                    <Result
                                        status="success"
                                        title="Your data submitted successfully!"
                                    // extra={
                                    //     <>
                                    //         <Button
                                    //             type="primary"
                                    //             onClick={() => {
                                    //                 Router.push('/onboardingTopic')
                                    //             }}
                                    //         >
                                    //             Home
                                    //         </Button>
                                    //     </>
                                    // }
                                    />
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default OnboardingTopicForm