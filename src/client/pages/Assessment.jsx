import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getUserAssessments from '@wasp/queries/getUserAssessments';
import createAssessment from '@wasp/actions/createAssessment';

export function AssessmentPage() {
  const { assessmentId } = useParams();
  const { data: assessments, isLoading, error } = useQuery(getUserAssessments, { userId: assessmentId });
  const createAssessmentFn = useAction(createAssessment);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateAssessment = () => {
    createAssessmentFn({ assessmentId });
  };

  return (
    <div className='p-4'>
      {assessments.map((assessment) => (
        <div
          key={assessment.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{assessment.question}</div>
          <div>{assessment.answer}</div>
          <div>{assessment.score}</div>
        </div>
      ))}
      <button
        onClick={handleCreateAssessment}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Create Assessment
      </button>
    </div>
  );
}