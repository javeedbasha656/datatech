import React from 'react';
import { useStepsForm } from 'sunflower-antd';
import {
    Steps, Input, Button, Form,
    Result, Select, message, Empty
} from 'antd';
import Router from 'next/router'
// import styles from './OnboardingStepForm.module.css'
import { DomainAPI } from '../../endPointsURL';

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
        offset: 2,
        span: 4,
    },
    wrapperCol: {
        offset: 2,
        span: 10,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 10,
    },
};


function OnboardingForm(props) {

    const [user, setUser] = React.useState([])

    const getApi = async () => {
        const res = await fetch(DomainAPI)
        const data = await res.json()
        // console.log(data)
        setUser(data)
    }

    React.useEffect(() => {
        getApi()
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
            if (values.length !== 0) {
                console.log(values);
                message.success('This is a success message');
                setTimeout(() => {
                    Router.push('/')
                }, 2000)
                return 'ok';
            }
            else {
                console.log("Error")
            }
        },
        total: 4,
    });

    const formList = [
        <>
            <Form.Item
                label="Username"
                // className={styles.labelCenter}
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
            <Form.Item label="Email" name="email"
            // className={styles.labelCenter}
            >
                <Input placeholder="Email" />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button onClick={() =>
                    gotoStep(current + 1)}>Next</Button>
            </Form.Item>
        </>,
        <>
            <Form.Item
                // className={styles.labelCenter}
                label="First Name"
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
            <Form.Item label="Email" name="person"
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
            <Form.Item {...tailLayout}>
                <Button
                    onClick={() => gotoStep(current - 1)}
                    style={{ marginRight: 10 }}>
                    Prev</Button>
                <Button onClick={() => gotoStep(current + 1)}>Next</Button>
            </Form.Item>
        </>,

        <>
            <Form.Item
                label="Address"
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
            <Form.Item {...tailLayout}>
                <Button
                    style={{ marginRight: 10 }}
                    type="primary"
                    htmlType="submit"
                    loading={formLoading}
                    onClick={() => {
                        submit().then(result => {
                            if (result === 'ok') {
                                console.log("its logging here")
                                gotoStep(current + 1);
                            }
                        });
                    }}
                >
                    Submit
                </Button>
                <Button onClick={() => gotoStep(current - 1)}>Prev</Button>
            </Form.Item>
        </>,
    ];

    return (
        <div style={{ marginTop: '60px' }}>
            <Steps {...stepsProps} type="navigation">
                <Step title="Step 1" />
                <Step title="Step 2" />
                <Step title="Step 3" />
            </Steps>

            <div style={{ marginTop: 60 }}>
                <Form {...layout} {...formProps} >
                    {formList[current]}
                </Form>

                {current === 3 && (
                    <Result
                        status="success"
                        title="Submit is succeed!"
                        extra={
                            <>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        Router.push('/onboarding')
                                    }}
                                >
                                    Home
                                </Button>
                            </>
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default OnboardingForm