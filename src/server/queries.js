import HttpError from '@wasp/core/HttpError.js'

export const getUserCourses = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { userId } = args;

  const userCourses = await context.entities.UserCourse.findMany({
    where: { userId },
    include: { course: true }
  });

  if (userCourses.length === 0) { throw new HttpError(400, 'No courses found for user') }

  const courses = userCourses.map(userCourse => userCourse.course);

  return courses;
}

export const getUserAssessments = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const assessments = await context.entities.Assessment.findMany({
    where: { userId: args.userId }
  });

  if (assessments.length > 0 && assessments[0].userId !== context.user.id) {
    throw new HttpError(400);
  }

  return assessments;
}
