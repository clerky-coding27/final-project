import SignInFormComponent from './SignInFormComponent';

export default function signInPage() {
  return (
    <main>
      <div id="SignInSection" className="card blurry">
        <h1 className="text-3xl">Sign In</h1>
        <SignInFormComponent />;
      </div>
    </main>
  );
}
