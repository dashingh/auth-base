import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Typography } from 'antd';
import {
  cardStyle,
  containerStyle,
  footerStyle,
  headerStyle,
  iconStyle,
  titleStyle,
} from './style';

const { Title, Paragraph } = Typography;

export default function SignUpPage() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    // send the data to your backend
  };

  return (
    <div style={containerStyle}>
      <Card style={cardStyle}>
        <div style={headerStyle}>
          <Title level={2} style={titleStyle}>
            Create an account
          </Title>
          <Paragraph style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
            Fill in the details below to get started
          </Paragraph>
        </div>

        <Form
          form={form}
          name='signup'
          layout='vertical'
          onFinish={onFinish}
          autoComplete='off'
          requiredMark={false}
        >
          <Form.Item
            name='name'
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input
              prefix={<UserOutlined style={iconStyle} />}
              placeholder='Full Name'
              size='large'
            />
          </Form.Item>

          <Form.Item
            name='email'
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input
              prefix={<MailOutlined style={iconStyle} />}
              placeholder='Email Address'
              size='large'
            />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 8, message: 'Password must be at least 8 characters' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={iconStyle} />}
              placeholder='Password'
              size='large'
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              size='large'
              style={{ width: '100%', marginTop: '8px' }}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <div style={footerStyle}>
          <Paragraph style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
            Already have an account? <a href='/login'>Log in</a>
          </Paragraph>
        </div>
      </Card>
    </div>
  );
}
