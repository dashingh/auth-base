import { LockOutlined, MailOutlined } from '@ant-design/icons';
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

export default function SignInPage() {
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
            Log In
          </Title>
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
              Log In
            </Button>
          </Form.Item>
        </Form>

        <div style={footerStyle}>
          <Paragraph style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
            Don't have an account? <a href='/login'>Sign Up</a>
          </Paragraph>
        </div>
      </Card>
    </div>
  );
}
