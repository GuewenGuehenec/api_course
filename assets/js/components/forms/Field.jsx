import React from 'react';

const Field = ({name, label, value, onChange, placeHolder = "", type = "text", error = ""}) =>
    (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                value={value}
                onChange={onChange}
                id={name}
                name={name}
                type={type}
                placeholder={placeHolder || label}
                className={"form-control" + (error && " is-invalid")}/>
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
    );


export default Field;