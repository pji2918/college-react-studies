import { Link, useNavigate, useSearchParams } from "react-router";

export default function Users() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const users = [
        {
            userId: 1,
            name: "User 1",
        },
        {
            userId: 2,
            name: "User 2",
        },
        {
            userId: 3,
            name: "User 3",
        },
    ];

    return (
        <>
            <h1>Users</h1>

            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate(-1)}>Back</button>
            {/* <p>{searchParams.get("page")}</p> */}

            <input
                value={searchParams.get("keyword")}
                onChange={(e) => setSearchParams({ keyword: e.target.value })}
            />

            {users.map((value) => (
                <Link key={value.userId} to={`/users/${value.userId}`}>
                    {value.name}
                </Link>
            ))}
        </>
    );
}
