import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();
  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <>
            {isPrivate && <Header />}
            <Component />
          </>
        ) : (
            <Redirect
              to={{
                pathname: isPrivate ? '/' : '/trees',
                state: { from: location },
              }}
            />
          );
      }}
    />
  );
};

export default Route;