import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getUserCourses from '@wasp/queries/getUserCourses';

export function DashboardPage() {
  const { data: userCourses, isLoading, error } = useQuery(getUserCourses);
  const deleteUserCourseFn = useAction(deleteUserCourse);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {userCourses.map((userCourse) => (
        <div
          key={userCourse.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{userCourse.course.title}</div>
          <div>{userCourse.course.description}</div>
          <div>
            <button
              onClick={() => deleteUserCourseFn({ userCourseId: userCourse.id })}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            >
              Delete
            </button>
            <Link
              to={`/course/${userCourse.course.id}`}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
            >
              Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}