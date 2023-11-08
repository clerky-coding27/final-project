import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMatchesByMentorId } from '../../../../database/matches';
import {
  getSingleUserWithMenteeUniversityApplicationbyUserIDJSONROW,
  getUserById,
  getUserBySessionToken,
} from '../../../../database/users';

export default async function matchingOverviewMentors() {
  const sessionTokenCookie = await cookies().get('sessionToken');

  const currentUser =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!currentUser) {
    redirect('/signIn?returnTo=/signUp');
  }

  const currentUserMatches = await getMatchesByMentorId(Number(currentUser.id));

  const currentUserMatchesData = Promise.all(
    currentUserMatches.map(async (m) => {
      const mentee = getUserById(m.menteeUserId);
      return mentee;
    }),
  );

  return (
    <main>
      <div id="pageHeaderSection" className="card blurry">
        <h1 className="h1-custom-primary">My Matching Overview</h1>
      </div>
      <div id="activeMatchesSection" className="card blurry">
        <h2 className="h2-custom-primary">Active Matches</h2>
        <p className="p-custom-primary">Indicated max. capacity: XYZ</p>
        <div
          id="exampleActiveMatchesList"
          // filter matching list here
        >
          <p id="exampleActiveMatch" className="card sub-blurry">
            Active Match #1: Menteephoto | Menteename | Mentee contact info |
            Mentee targetunis | Mentee targetsubjects | mentee targetstudylevel
            | Match active since: DATE
            <button className="btn-custom-primary">
              I am no longer mentoring this mentee
            </button>
          </p>
        </div>
      </div>
      <div id="requestedMatchesSection" className="card blurry">
        <h2 className="h2-custom-primary">Requested Matches</h2>
        <p className="p-custom-primary">
          You have one week to respond to a match request. Afterwards, the
          request will automatically be rejected.
        </p>

        <div
          id="exampleRequestedMatchesList"
          // filter matching list here
        >
          {await currentUserMatches.map((m) => {
            return (
              <p
                key={`${m.id}`}
                id="exampleRequestedMatch"
                className="card sub-blurry"
              >
                Match Request#1: Menteephoto | {m.menteeUserId} | Mentee
                targetunis | Mentee targetsubjects | mentee targetstudylevel |
                Message from mentee | Date of request: DATE
                <button className="btn-custom-primary">
                  Accept match request
                </button>
                <button className="btn-custom-primary">
                  Reject match request
                </button>
                <label htmlFor="reasonRejection">
                  Please briefly indicate the reason for your rejection:
                  <span id="required">*</span>
                </label>
                <input
                  id="reasonRejection"
                  className="input input-bordered w-full max-w-xs"
                />
              </p>
            );
          })}
          <p id="exampleRequestedMatch" className="card sub-blurry">
            Match Request#1: Menteephoto | Menteename | Mentee targetunis |
            Mentee targetsubjects | mentee targetstudylevel | Message from
            mentee | Date of request: DATE
            <button className="btn-custom-primary">Accept match request</button>
            <button className="btn-custom-primary">Reject match request</button>
            <label htmlFor="reasonRejection">
              Please briefly indicate the reason for your rejection:
              <span id="required">*</span>
            </label>
            <input
              id="reasonRejection"
              className="input input-bordered w-full max-w-xs"
            />
          </p>
        </div>
      </div>
    </main>
  );
}
