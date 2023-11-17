import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMatchesByMenteeId } from '../../../../database/matches';
import { getUserById, getUserBySessionToken } from '../../../../database/users';
import MentoringEndFormComponent from '../../../components/MentoringEndFormComponent';
import MentorTableComponent from '../../../components/MentorTableComponent';

export default async function dashboard() {
  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');

  const currentUser =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!currentUser) redirect('/signUp');

  // get all Match Requests

  const currentUserMatches = await getMatchesByMenteeId(Number(currentUser.id));
  const currentUserMatchesData = Promise.all(
    currentUserMatches.map((m) => {
      const mentor = getUserById(m.mentorUserId);
      return mentor;
    }),
  );

  // get only Accepted Matches
  const currentUserMatchAccepts = currentUserMatches.filter(
    (e) => e.statusInternal === 'mentor accepted match',
  );

  const currentUserMatchAcceptsSingleUser = currentUserMatchAccepts[0];

  /*   const currentUserMatchAccceptsData = await getUserById(
    currentUserMatchAcceptsSingleUser.mentorUserId,
  ); */

  // get only Match Requests
  const currentUserMatchRequests = currentUserMatches.filter(
    (e) => e.statusInternal === 'mentee requested mentor',
  );

  const currentUserMatchRequestsSingleUser = currentUserMatchRequests[0];

  // get only past matches
  const currentUserPastMatches = currentUserMatches.filter(
    (e) => e.statusInternal === 'mentorship ended',
  );

  const currentUserPastMatchesData = Promise.all(
    currentUserPastMatches.map((m) => {
      const mentee = getUserById(m.menteeUserId);
      return mentee;
    }),
  );

  return (
    <main id="visibleMENTEES">
      {/*  <h1 className="h1-custom-primary">Your Matching Overview</h1>
      <div id="pageHeaderSection" className="card blurry">

        {currentUserMatchRequests.length > 0 ? (
          <ul className="steps">
            <li className="step step-primary">Enter personal information</li>
            <li className="step step-primary">
              Enter target universities & subjects
            </li>
            <li className="step step-primary">Choose your best mentor match</li>
            <li className="step step-accent">Wait for mentor acceptance</li>

            <li className="step">Start your mentorship journey</li>
            <li className="step">Apply to your dream uni!</li>
          </ul>
        ) : (
          ''
        )}
        {currentUserMatchAccepts.length > 0 ? (
          <ul className="steps">
            <li className="step step-primary">Enter personal information</li>
            <li className="step step-primary">
              Enter target universities & subjects
            </li>
            <li className="step step-primary">Choose your best mentor match</li>
            <li className="step step-primary">Wait for mentor acceptance</li>

            <li className="step step-accent">Start your mentorship journey</li>
            <li className="step">Apply to your dream uni!</li>
          </ul>
        ) : (
          ''
        )}
      </div>
      {currentUserMatchRequests.length > 0 ? (
        <div id="requestedMatchesSection" className="card blurry">
          <h2 className="h2-custom-primary">You requested a mentor!</h2>
          <div id="sentRequests">
            <p className="p-custom-primary">
              You requested a mentor! A mentor has one week to accept or reject
              your match request. In case they do not respond within the week,
              the request will automatically be rejected and you can request a
              new mentor.
            </p>
              {currentUserMatchRequestsSingleUser ? (
              <MentorTableComponent
                id={currentUserMatchRequestsSingleUser.mentorUserId}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      ) : (
        ''
      )}
      {currentUserMatchAccepts ? (
        <div id="activeMatchesSection" className="card blurry">
          <h2 className="h2-custom-primary">Active Mentor</h2>
          {currentUserMatchAccepts.map((m) => {
            return (
              <div key={`mentee-${m.id}`} className="card sub-blurry">
                <p className="p-custom-primary">
                  Active Match Mentorphoto | | Mentor contact info | Mentor uni
                  & subject & studylevel 1 | Mentor uni & subject & studylevel 2
                  | Mentor uni & subject & studylevel 3 | Match active since:
                  DATE
                </p>
                <MentoringEndFormComponent
                  match={m}
                  buttonText="I am no longer being mentored by this mentor"
                />
              </div>
            );
          })}
        </div>
      ) : (
        ''
      )} */}
    </main>
  );
}
