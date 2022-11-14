import React, { useState, useEffect } from 'react';
import { useStepsForm } from 'sunflower-antd';
import {
    Steps, Input, Button, Form,
    Result, Select, message, Empty, Card
} from 'antd';
import Router from 'next/router'
// import styles from './OnboardingStepForm.module.css'
// import { TestUserAPI } from '../../endPointsURL';

const { Step } = Steps;

const { Option } = Select;

const onChange = (value) => {
    console.log(`selected ${value}`);
};

const onSearch = (value) => {
    console.log('search:', value);
};

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 24,
    },
};



function OnboardingTopicForm(props) {

    const [user, setUser] = useState([])

    // const getApi = async () => {
    //     const res = await fetch(TestUserAPI)
    //     const data = await res.json()
    //     // console.log(data)
    //     setUser(data)
    // }

    useEffect(() => {
        // getApi()
    }, [])


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
                    console.log(values);
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
        total: 4,
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
                    <label>Username<span class="error">*</span></label>
                    <Form.Item
                        label=""
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input username',
                            },
                        ]}
                    >
                        <Input placeholder="Username" />
                    </Form.Item >
                </div>
                <div className='col-md-6'>
                    <lable>Email</lable>
                    <Form.Item
                        label=""
                        name="email"
                    // className={styles.labelCenter}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
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
        </Card>
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
                            </Steps>
                        </Card>

                        <div style={{ marginTop: '30px' }}>
                            <Form {...layout} {...formProps} >
                                {formList[current]}
                            </Form>

                            {current === 3 && (
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