'use client';

import { useState } from 'react';
import { degreetype } from '../../../../database/degreetype';
import { Subject } from '../../../../migrations/00001-createTableSubjects';
import { University } from '../../../../migrations/00002-createTableUniversities';
import { UserAll } from '../../../../migrations/00004-createTableUsers';

type Props = {
  universities: University[];
  subjects: Subject[];
  userdata: UserAll;
};

export default function MenteeTargetUniversitySubjectFormComponent(
  props: Props,
) {
  const [studyLevelIdInput, setStudyLevelIdInput] = useState(1);
  const [universityIdInputOne, setUniversityIdInputOne] = useState(1);
  const [universityIdInputTwo, setUniversityIdInputTwo] = useState(1);
  const [universityIdInputThree, setUniversityIdInputThree] = useState(1);
  const [subjectIdInputOne, setSubjectIdInputOne] = useState(1);
  const [subjectIdInputTwo, setSubjectIdInputTwo] = useState(1);
  const [subjectIdInputThree, setSubjectIdInputThree] = useState(1);

  return (
    <form>
      <legend>
        Indicate the degree type you will be applying for
        <span id="required">*</span>
      </legend>
      <label htmlFor="selectDegreetype">
        DegreeType<span id="required">*</span>
      </label>
      <select
        id="selectDegreetype"
        name="selectDegreetype"
        onChange={(event) =>
          setStudyLevelIdInput(Number(event.currentTarget.value))
        }
        required
      >
        <option key="dataID-default-select" value="default-select">
          --Please choose your degreetype--
        </option>

        {degreetype.map((d) => {
          return (
            <option key={`dataID-select-${d.id}`} value={d.id}>
              {d.name}
            </option>
          );
        })}
      </select>
      <label htmlFor="targetUniversities">
        Indicate your top three university choices:
        <span id="required">*</span>
      </label>
      <select
        id="targetUniversity1"
        name="targetUniversities"
        onChange={(event) =>
          setUniversityIdInputOne(Number(event.currentTarget.value))
        }
        required
      >
        <option key="dataID-default-select" value="default-select">
          --Please choose your university--
        </option>

        {props.universities.map((d) => {
          return (
            <option key={`dataID-select-${d.id}`} value={d.id}>
              {d.name}
            </option>
          );
        })}
      </select>

      <select
        id="targetUniversity2"
        name="targetUniversities"
        onChange={(event) =>
          setUniversityIdInputTwo(Number(event.currentTarget.value))
        }
        required
      >
        <option key="dataID-default-select" value="default-select">
          --Please choose your university--
        </option>

        {props.universities.map((d) => {
          return (
            <option key={`dataID-select-${d.id}`} value={d.id}>
              {d.name}
            </option>
          );
        })}
      </select>
      <select
        id="targetUniversity3"
        name="targetUniversities"
        onChange={(event) =>
          setUniversityIdInputThree(Number(event.currentTarget.value))
        }
        required
      >
        <option key="dataID-default-select" value="default-select">
          --Please choose your university--
        </option>

        {props.universities.map((d) => {
          return (
            <option key={`dataID-select-${d.id}`} value={d.id}>
              {d.name}
            </option>
          );
        })}
      </select>
      <label htmlFor="subjectName">
        Indicate your top three subject choice:
        <span id="required">*</span>
      </label>
      <select
        id="selectSubject"
        name="selectSubject"
        onChange={(event) =>
          setSubjectIdInputOne(Number(event.currentTarget.value))
        }
        required
      >
        <option key="dataID-default-select" value="default-select">
          --Please choose your subject--
        </option>

        {props.subjects.map((d) => {
          return (
            <option key={`dataID-select-${d.id}`} value={d.id}>
              {d.name}
            </option>
          );
        })}
      </select>
      <select
        id="selectSubject"
        name="selectSubject"
        onChange={(event) =>
          setSubjectIdInputTwo(Number(event.currentTarget.value))
        }
        required
      >
        <option key="dataID-default-select" value="default-select">
          --Please choose your subject--
        </option>

        {props.subjects.map((d) => {
          return (
            <option key={`dataID-select-${d.id}`} value={d.id}>
              {d.name}
            </option>
          );
        })}
      </select>
      <select
        id="selectSubject"
        name="selectSubject"
        onChange={(event) =>
          setSubjectIdInputThree(Number(event.currentTarget.value))
        }
        required
      >
        <option key="dataID-default-select" value="default-select">
          --Please choose your subject--
        </option>

        {props.subjects.map((d) => {
          return (
            <option key={`dataID-select-${d.id}`} value={d.id}>
              {d.name}
            </option>
          );
        })}
      </select>
      <button id="submitAllUniInformation">
        Submit all University Information
      </button>
    </form>
  );
}