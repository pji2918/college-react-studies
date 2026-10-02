export default function FormDataLogin() {
    /**
     * @param {import("react").SubmitEvent<HTMLFormElement>} e
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log(formData.get("username"));
        console.log(formData.get("password"));

        const data = Object.fromEntries(formData.entries());
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>FormData</h2>
            <input type="text" name="username" />
            <input type="password" name="password" />
            <input type="submit" value="LOGIN" />
        </form>
    );
}
