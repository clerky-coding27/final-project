import { getRoles } from '../../../database/roles';
import SignUpForm from './SignUpFormComponent';

export default async function signUpPage() {
  const roles = await getRoles();

  return (
    <main>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up</h1>
            <p className="p-custom-primary">
              Do you want to apply at a top university? The Project Access
              programs are providing free mentorships helping less privileged
              students apply for degrees at leading universities. When you join
              the program you will be paired with a mentor who studies at your
              dream university and guides you through the application process.
              <br />
              <br />
              Your mentor will give you 1-1 advice on picking the right course
              and university for you, personal statements, references,
              interviews, and all other aspects of your application. You will
              also get access to our collection of resources for all steps of
              the application and join an awesome community of inspiring
              applicants from all around the world.
            </p>
          </div>
          <SignUpForm roles={roles} />
        </div>
      </div>
    </main>
  );
}
