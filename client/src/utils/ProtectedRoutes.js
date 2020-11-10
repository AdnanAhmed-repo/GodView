import React from "react";
import { Route, Redirect } from "react-router-dom";

const AppRoute = (props) => {
	
	return (
		<Route
     		exact
      		path={props.path}
      		render={(data) =>
        	localStorage.getItem("user") ? (
          	<props.component {...data} username={props.username} />
        	) : (
          		<Redirect to={{ pathname: "/admin-login" }} />
        	)
      	}/>
	);
};

export default AppRoute;
