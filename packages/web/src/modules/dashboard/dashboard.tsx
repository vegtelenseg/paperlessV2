import * as React from 'react';
import {WithStyles, createStyles, withStyles} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import {Theme} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import {withRouter, RouteComponentProps} from 'react-router-dom';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {AuthContext, AuthContextType} from '../../contexts';
import classNames from 'classnames';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
    },
    grow: {
      flexGrow: 1,
    },
    toolbar: {
      padding: '0 5%',
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    container: {
      padding: '10px 5%',
    },
    title: {
      color: theme.palette.primary.contrastText,
      fontWeight: 900,
      fontSize: 30,
      height: 30,
    },
    nav: {
      textAlign: 'center',
      '& button': {
        color: theme.palette.secondary.light,
        textTransform: 'capitalize',
        transition: '0.4s',
        '&:hover': {
          color: theme.palette.primary.contrastText,
        },
      },
    },
    active: {
      '& span:first-child': {
        color: theme.palette.secondary.contrastText,
        borderBottom: `solid 1px ${theme.palette.primary.contrastText}`,
      },
      borderBottomWidth: 0,
    },
    logoutDisplay: {
      display: 'block',
      overflow: 'visible',
    },
    logout: {
      cursor: 'pointer',
      transition: '0.4s ease',
      width: '100%',
      paddingRight: '37px',
      boxSizing: 'border-box',
      marginTop: '17px',
      color: theme.palette.secondary.light,
      textTransform: 'capitalize',
      position: 'absolute',
    },
  });

interface Props extends WithStyles<typeof styles>, RouteComponentProps {
  children: any;
  handleLogout: () => void;
}

interface State {
  open: boolean;
}

class Root extends React.Component<Props> {
  public state = {
    open: false,
  };

  public render() {
    const {children, classes, history} = this.props;
    const {open} = this.state;
    return (
      <AuthContext.Consumer>
        {(auth: AuthContextType) => (
          <div className={classes.root}>
            {auth.authenticated && (
              <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                  <div className={`${classes.nav} ${classes.grow}`}>
                    <Button
                      onClick={() => history.push('/')}
                      className={
                        history.location.pathname === '/' ? classes.active : ''
                      }
                    >
                      Trades
                    </Button>
                    <Button
                      onClick={() => history.push('suppliers')}
                      className={
                        history.location.pathname === '/suppliers'
                          ? classes.active
                          : ''
                      }
                    >
                      Suppliers
                    </Button>
                  </div>
                  <Button
                    color="inherit"
                    style={{textAlign: 'right', textTransform: 'lowercase'}}
                    onClick={() => this.setState({open: !open})}
                  >
                    {auth.username}
                    <FontAwesomeIcon
                      icon={open ? faChevronUp : faChevronDown}
                      style={{
                        paddingLeft: 10,
                        fontSize: '13px',
                        lineHeight: '21px',
                      }}
                    />
                    <span
                      className={
                        open
                          ? classNames(classes.logout, classes.logoutDisplay)
                          : classes.logout
                      }
                      style={{opacity: open ? 1 : 0, transition: 'ease 1s'}}
                      onClick={() => {
                        this.props.handleLogout();
                        this.props.history.push('/');
                      }}
                    >
                      Log out
                    </span>
                  </Button>
                </Toolbar>
              </AppBar>
            )}
            <div className={classes.container}>{children}</div>
          </div>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default withStyles(styles)(withRouter(Root));
