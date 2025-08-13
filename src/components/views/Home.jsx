import React from "react";
import { useUser } from "../../auth/UserContext";

export default function Home() {
  const { loggedInUser, loading } = useUser();

  if (loading) return <div>Loading...</div>;
  console.log(loggedInUser);
  return (
    <div>
      <h1>Welcome to SeAT!</h1>
      {loggedInUser ? (
        <div>
          <p>Hello, {loggedInUser.UserFirstname}!</p>
        </div>
      ) : (
        <div>
          <p>
            Please <a href="/login">login</a> or{" "}
            <a href="/register">register</a> to continue.
          </p>
        </div>
      )}
    </div>
  );
}
