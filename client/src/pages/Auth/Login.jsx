import LoginCard from "../../components/ui/Auth/LoginCard";
import AuthIllustration from "../../components/ui/Auth/AuthIllustration";

function Login() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
      <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-6 py-10 lg:grid-cols-2">

        {/* Left Side */}

        <AuthIllustration />

        {/* Right Side */}

        <div className="flex justify-center lg:justify-end">
          <LoginCard />
        </div>

      </div>
    </section>
  );
}

export default Login;