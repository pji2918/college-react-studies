import { useParams } from "react-router";

export default function UserDetail() {
    // const params = useParams();
    const { userId } = useParams();

    // return <h1>User Detail: {params.userId}</h1>;
    return <h1>User Detail: {userId}</h1>;
}
