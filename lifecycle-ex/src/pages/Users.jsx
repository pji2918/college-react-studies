import { useState, useEffect } from "react";

export default function Users() {
    const [users, setUsers] = useState({ results: [] });

    useEffect(() => {
        fetch("https://api.randomuser.me/?results=10")
            .then((value) => value.json())
            .then((value) => {
                console.log(value);
                setUsers(value);
            });
    }, []);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>사진</th>
                        {/* <th>성별</th>
                        <th>연령</th> */}
                    </tr>
                </thead>
                <tbody>
                    {users.results.map((value) => (
                        <User key={value.login.uuid} userData={value} />
                    ))}
                </tbody>
            </table>
        </>
    );
}

function User({ userData }) {
    return (
        <tr>
            <td>{`${userData.name.first} ${userData.name.last}`}</td>
            <td>
                <img src={userData.picture.thumbnail} />
            </td>
            {/* <td>{userData.gender === "male" ? "남" : "여"}</td>
            <td>{userData.dob.age}</td> */}
        </tr>
    );
}
