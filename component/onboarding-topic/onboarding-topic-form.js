import React from 'react';
import { useStepsForm } from 'sunflower-antd';
import {
    Steps, Input, Button, Form,
    Result, Select, message, Empty, Card
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
        span: 16,
    },
};


function OnboardingTopicForm(props) {

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
            try {
                if (values.length !== 0) {
                    console.log(values);
                    message.success('This is a success message');
                    setTimeout(() => {
                        Router.push('/')
                    }, 2000)
                    return 'ok';
                }
            }
            catch (err) {
                console.log(err)
                message.danger('Something error has found');
            }
        },
        total: 4,
    });

    const formList = [
        <Card
            type="inner"
            title="Step 1"
            bordered={false}
            className={'cardLayout'}
        >
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
        </Card>,
        <Card
            type="inner"
            title="Step 2"
            bordered={false}
            className={'cardLayout'}
        >
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
        </Card>,

        <Card
            type="inner"
            title="Step 3"
            bordered={false}
            className={'cardLayout'}
        >
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
        </Card>,
    ];

    return (
        <div style={{ marginTop: '30px' }}>
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
                            title="Submit is succeed!"
                            extra={
                                <>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            Router.push('/onboardingTopic')
                                        }}
                                    >
                                        Home
                                    </Button>
                                </>
                            }
                        />
                    </Card>
                )}
            </div>
        </div>
    );
};

export default OnboardingTopicForm