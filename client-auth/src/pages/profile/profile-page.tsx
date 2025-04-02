'use client';

import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Divider, Form, Input, Typography, message } from 'antd';
import { useState } from 'react';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

export default function ProfilePage() {
  const [form] = Form.useForm();

  // Mock user data
  const [userData, setUserData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    bio: 'Frontend developer passionate about creating intuitive user experiences. I love working with React and exploring new technologies.',
    avatarUrl: '/placeholder.svg?height=200&width=200',
  });

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        setUserData({ ...userData, ...values });
        message.success('Profile updated successfully!');
      })
      .catch((info) => {
        message.error('Validation failed. Please check your inputs.');
      });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
      <Card style={{ borderRadius: '8px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          <Avatar
            size={120}
            icon={<UserOutlined />}
            src={userData.avatarUrl}
            style={{ marginBottom: '16px' }}
          />

          <div style={{ textAlign: 'center' }}>
            <Title level={2} style={{ marginBottom: '4px' }}>
              {userData.name}
            </Title>
            <Text type='secondary' style={{ fontSize: '16px' }}>
              <MailOutlined style={{ marginRight: '8px' }} />
              {userData.email}
            </Text>
            <Divider style={{ margin: '16px 0' }} />
            <Paragraph style={{ maxWidth: '600px', textAlign: 'left' }}>
              {userData.bio}
            </Paragraph>
          </div>
        </div>
      </Card>
    </div>
  );
}
