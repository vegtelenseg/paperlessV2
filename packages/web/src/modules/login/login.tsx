import * as React from 'react';
import {ConfigService} from '@stackworx/react';
import {RouteComponentProps} from 'react-router-dom';
import {createStyles, WithStyles, withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {TextField} from 'formik-material-ui';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import {Theme} from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    holder: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'calc(100vh - 20px)',
    },
    login: {
      padding: 0,
      margin: 'auto',
      '& h3': {
        padding: 15,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.contrastText,
      },
      '& form': {
        padding: 15,
        minWidth: 300,
        paddingLeft: 50,
        paddingRight: 50,
      },
    },
  });

const schema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Required'),
  password: Yup.string().required('Required'),
});

interface Props extends WithStyles<typeof styles>, RouteComponentProps {
  handleSubmit: (opts: {email: string; password: string}) => Promise<void>;
}

const Login = (props: Props) => {
  const {classes} = props;
  return (
    <div className={classes.holder}>
      <Paper className={classes.login} elevation={4}>
        <Typography variant="headline" component="h3">
          Login
        </Typography>
        <Formik
          onSubmit={async (values, {setSubmitting, setStatus}) => {
            setSubmitting(true);

            try {
              await props.handleSubmit(values);
              setSubmitting(false);
              props.history.push(
                props.location.state ? props.location.state.from : '/'
              );
            } catch (ex) {
              setStatus(ex.message);
              setSubmitting(false);
            }
          }}
          validationSchema={schema}
          initialValues={{email: '', password: ''}}
          render={({handleSubmit, status}) => (
            <Form>
              <Field
                name="email"
                label="Email"
                fullWidth={true}
                component={TextField}
              />
              <br />
              <Field
                name="password"
                label="Password"
                type="password"
                fullWidth={true}
                component={TextField}
              />
              <br />
              <Button
                variant="contained"
                color="primary"
                style={{margin: 15, marginLeft: 0, width: '100%'}}
                onClick={() => handleSubmit()}
              >
                Login
              </Button>
              {status && <Typography>{status}</Typography>}
            </Form>
          )}
        />
      </Paper>
    </div>
  );
};

export default withStyles(styles)(Login);
