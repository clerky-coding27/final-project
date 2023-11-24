import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCountries } from '../../../database/countries';
import { getRoleByName } from '../../../database/roles';
import { getUserBySessionToken } from '../../../database/users';
import MenteeHeaderComponent from '../../components/MenteeHeaderComponent';
import PersonalDataFormComponent from './PersonalDataFormComponent';

export default async function personaldata() {
  const countries = await getCountries();

  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');

  const currentUser =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!currentUser || !currentUser.userRolesId) redirect('/signIn?returnTo=/#');

  const currentUserRole = currentUser.userRolesId[0];
  if (!currentUserRole) redirect('/signIn?returnTo=/#');

  if (!currentUserRole.name) {
    return;
  }
  const currentUserRoleByName = await getRoleByName(currentUserRole.name);

  if (!currentUserRoleByName) {
    redirect(`../error`);
  }

  const menteeIncompleteRoleByName = await getRoleByName('incomplete mentee');
  const mentorIncompleteRoleByName = await getRoleByName('incomplete mentor');

  const menteeCompleteRoleByName = await getRoleByName('complete mentee');
  const mentorCompleteRoleByName = await getRoleByName('complete mentor');

  const newRole =
    currentUserRoleByName === menteeIncompleteRoleByName
      ? menteeCompleteRoleByName
      : mentorCompleteRoleByName;

  if (!newRole) {
    redirect(`../error`);
  }

  return (
    <main>
      {currentUserRoleByName === menteeIncompleteRoleByName ? (
        <MenteeHeaderComponent
          step={[1]}
          titleBold="Welcome."
          titleNormal="Happy you want to become a"
          titleUnderlined={`${currentUserRoleByName.type}.`}
        />
      ) : (
        ''
      )}
      {currentUserRoleByName === mentorIncompleteRoleByName ? (
        <div className="card blurry">
          <h1 className="mt-10 mb-7 mx-2 border-custom-primary">
            <span className="lg:text-6xl font-bold tracking-tight text-900 text-accent sm:text-3xl ">
              Welcome.{' '}
            </span>
            <span className="lg:text-3xl font-bold tracking-tight text-gray-900 sm:text-2xl ">
              Happy you want to become a{' '}
            </span>
            <span className="lg:text-3xl font-bold tracking-tight text-gray-900 sm:text-2xl decoration-accent decoration-4 underline underline-offset-4">
              {currentUserRoleByName.type}.
            </span>
          </h1>
          <ul className="steps hidden sm:mb-1 sm:flex sm:justify-center">
            <li className="step step-accent">Enter personal information</li>
            <li className="step ">Enter academic background</li>
            <li className="step">Submit registration & enter mentor pool</li>
            <li className="step ">Wait for mentee match request</li>

            <li className="step">Accept request within one week</li>
            <li className="step">& start your mentorship journey</li>
          </ul>
        </div>
      ) : (
        ''
      )}

      <div>
        <PersonalDataFormComponent
          countries={countries}
          currentUser={currentUser}
          currentUserRole={newRole}
        />
      </div>
    </main>
  );
}
