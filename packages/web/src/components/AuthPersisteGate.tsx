import * as React from 'react';
import { AuthContextType } from '../contexts/AuthContext';
// import LoadingMask from './LoadingMask';
// import { store } from '../../store';

interface Props {
  children: (auth: AuthContextType) => React.ReactNode;
}

interface State {
  loading: boolean;
  auth: AuthContextType;
}

export default class AuthPersistGate extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = {
      loading: true,
      auth: { authenticated: false },
    };
  }

  public componentDidMount() {
    if (localStorage) {
      const authRaw = localStorage.getItem('auth');

      if (authRaw) {
        try {
          const auth = JSON.parse(authRaw);

          // store.dispatch({
          //   payload: auth,
          //   type: 'LOGIN',
          // });

          this.setState({ auth });
        } catch (ex) {
          // tslint:disable-next-line
          console.log('Failed to parse stored auth');
        }
      }
    }

    this.setState({ loading: false });
  }

  public render() {
    const { /*loading,*/ auth } = this.state;

    // if (loading) {
    //   return <LoadingMask />;
    // }

    return this.props.children(auth);
  }
}
