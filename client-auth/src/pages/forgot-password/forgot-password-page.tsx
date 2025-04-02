'use client';

import { MailOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Typography } from 'antd';
import { useState } from 'react';

const { Title, Paragraph } = Typography;

export default function ForgotPasswordPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: any) => {
    setLoading(true);

    // call to request password reset
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '24px' }}>
      <Card bordered={false} style={{ borderRadius: '8px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Title level={2}>Forgot Password</Title>
          <Paragraph type='secondary'>
            Enter your email address and we'll send you a link to reset your
            password
          </Paragraph>
        </div>

        <Form form={form} layout='vertical' onFinish={handleSubmit}>
          <Form.Item
            name='email'
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder='Email address'
              size='large'
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              icon={<SendOutlined />}
              size='large'
              block
              loading={loading}
            >
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
