import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getUserCourses from '@wasp/queries/getUserCourses';
import createCourse from '@wasp/actions/createCourse';

export function CoursePage() {
  const { courseId } = useParams();
  const { data: userCourses, isLoading, error } = useQuery(getUserCourses, { userId: courseId });
  const createCourseFn = useAction(createCourse);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateCourse = () => {
    createCourseFn({ courseId });
  };

  return (
    <div className='p-4'>
      {userCourses.map((course) => (
        <div
          key={course.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{course.title}</div>
          <div>{course.description}</div>
          <div>{course.content}</div>
          <button
            onClick={handleCreateCourse}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Create Course
          </button>
        </div>
      ))}
    </div>
  );
}