import React from 'react';

const User = ({name, age, category, priority}) => (
    <div className={"user user-priority-"+ priority}>
        <h2 >{name}</h2>
        <div className="user-age">{age}</div>
        <div>{category}</div>

    </div>
);

export default User;