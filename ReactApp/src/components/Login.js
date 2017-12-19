import React from "react";
import { bool, func, object, string } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Col, Icon, Input, Form, Row } from 'antd';
import { login } from '../redux/actions/auth';

const FormItem = Form.Item;

class LoginForm extends React.Component {
  static propTypes = {
    fetching: bool.isRequired,
    labels: object.isRequired,
    language: string.isRequired,
    login: func.isRequired,
    loggedIn: bool.isRequired,
    error: string.isRequired
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values.username, values.password);
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
              {getFieldDecorator('username', {
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

const mapStateToProps = state => ({
  fetching: state.auth.fetching,
  labels: state.app.labels,
  language: state.app.language,
  loggedIn: state.auth.loggedIn,
  error: state.auth.error
});

const mapDispatchToProps = dispatch => bindActionCreators({
  login
}, dispatch);

const Login = Form.create()(LoginForm);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);