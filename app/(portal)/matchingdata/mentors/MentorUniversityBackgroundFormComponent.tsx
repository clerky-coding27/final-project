'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { attendancetype } from '../../../../database/attendancetype';
import { degreetype } from '../../../../database/degreetype';
import { Subject } from '../../../../migrations/00001-createTableSubjects';
import { University } from '../../../../migrations/00002-createTableUniversities';
import { UserAll } from '../../../../migrations/00004-createTableUsers';

type Props = {
  universities: University[];
  subjects: Subject[];
  userdata: UserAll;
};

export default function MentorUniversityBackgroundFormComponent(props: Props) {
  const [universityIdInput, setUniversityIdInput] = useState(1);
  const [subjectIdInput, setSubjectIdInput] = useState(1);
  const [attendanceTypeIdInput, setAttendanceTypeIdInput] = useState(1);
  const [studylevelIdInput, setStudylevelIdInput] = useState(1);

  const router = useRouter();

  async function handleCreateMentorUniversityBackground() {
    const currentUserID = await Number(props.userdata.id);

    await fetch('/../../../api/matchingdata/mentorUniversityBackground', {
      method: 'POST',
      body: JSON.stringify({
        userId: Number(currentUserID),
        studylevel: Number(studylevelIdInput),
        attendanceType: Number(attendanceTypeIdInput),
        universityId: Number(universityIdInput),
        subjectId: Number(subjectIdInput),
      }),
    });
    await router.refresh();
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await handleCreateMentorUniversityBackground();
      }}
    >
      <label htmlFor="selectUniversity">
        Name of the university<span id="required">*</span>
      </label>
      <select
        className="select select-bordered  w-full max-w-xs"
        id="selectUniversity"
        name="selectUniversity"
        onChange={(event) =>
          setUniversityIdInput(Number(event.currentTarget.value))
        }
        required
      >
        <option key="dataID-default-select" value="default-select">
          --Choose university--
        </option>

        {props.universities.map((d) => {
          return (
            <option key={`dataID-select-${d.id}`} value={d.id}>
              {d.name}
            </option>
          );
        })}
      </select>

      <label htmlFor="selectSubject">
        Name of the subject<span id="required">*</span>
      </label>

      <select
        className="select select-bordered  w-full max-w-xs"
        id="selectSubject"
        name="selectSubject"
        onChange={(event) =>
          setSubjectIdInput(Number(event.currentTarget.value))
        }
        required
      >
        <option key="dataID-default-select" value="default-select">
          --Choose subject--
        </option>

        {props.subjects.map((d) => {
          return (
            <option key={`dataID-select-${d.id}`} value={d.id}>
              {d.name}
            </option>
          );
        })}
      </select>
      <legend>
        DegreeType<span id="required">*</span>
      </legend>
      <select
        className="select select-bordered  w-full max-w-xs"
        id="selectDegreetype"
        name="selectDegreetype"
        onChange={(event) =>
          setStudylevelIdInput(Number(event.currentTarget.value))
        }
        required
      >
        <option key="dataID-default-select" value="default-select">
          --Choose degreetype--
        </option>

        {degreetype.map((d) => {
          return (
            <option key={`dataID-select-${d.id}`} value={d.id}>
              {d.name}
            </option>
          );
        })}
      </select>
      <legend>
        ApplicationStatus<span id="required">*</span>
      </legend>
      <select
        className="select select-bordered  w-full max-w-xs"
        id="selectAttendancetype"
        name="selectAttendancetype"
        onChange={(event) =>
          setAttendanceTypeIdInput(Number(event.currentTarget.value))
        }
        required
      >
        <option key="dataID-default-select" value="default-select">
          --Choose attendancetype--
        </option>

        {attendancetype.map((d) => {
          return (
            <option key={`dataID-select-${d.id}`} value={d.id}>
              {d.name}
            </option>
          );
        })}
      </select>

      <button className="btn-custom-primary" id="submitPersonalDetails">
        Add degree to my submitted Background
      </button>
    </form>
  );
}
