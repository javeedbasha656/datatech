import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';

export default function DomainModalForm() {

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
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
                        <Form.Item
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                className={'submitbtn submitButtonAlign'}
                                style={{marginBottom: 0}}
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </div>
    )
}