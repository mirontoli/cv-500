import React from "react";
import { object, string } from 'prop-types';
import { Button, Col, Icon, Input, Form, Row } from 'antd';

const FormItem = Form.Item;

class LoginForm extends React.Component {
  static propTypes = {
    labels: object.isRequired,
    language: string.isRequired,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { labels, language } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Row>
        <Col xs={{span: 24}} sm={{span: 24}} md={{span: 12, offset: 6}} xl={{span: 8, offset: 8}}  >
          <Form className="login-form" onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={labels.formUsernameField[language]} />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder={labels.formPasswordField[language]} />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                { labels.formLoginButton[language] }
              </Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    );
  }
}

export const Login = Form.create()(LoginForm);