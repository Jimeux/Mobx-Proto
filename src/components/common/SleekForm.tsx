import * as React from "react"

export const SleekForm = (props) =>
  <div className="login-form">
    <div className="header">
      <span>{props.title}</span>
    </div>
    <div className="body">
      {props.children}
      <div className="submit">
        <button onClick={props.onSubmit} disabled={props.disabled}>
          {props.submit}
        </button>
      </div>
    </div>
  </div>