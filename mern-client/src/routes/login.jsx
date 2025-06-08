export default function Login() {
  return (
    <div>
      <h1>Login Page 🥭</h1>
      <form className="flex flex-col gap-4 mt-4 max-w-sm">
        <input type="email" placeholder="Email" className="border p-2" />
        <input type="password" placeholder="Password" className="border p-2" />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
          Log In
        </button>
      </form>
    </div>
  );
}
