import HttpError from '@wasp/core/HttpError.js'

export const createCourse = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { title, description, content } = args;

  const newCourse = await context.entities.Course.create({
    data: {
      title,
      description,
      content,
      userId: context.user.id
    }
  });

  return newCourse;
}

export const createAssessment = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Assessment.create({
    data: {
      userId: context.user.id,
      question: args.question,
      answer: args.answer,
      score: args.score
    }
  });
}

export const addUserCourse = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.UserCourse.create({
    data: {
      userId: args.userId,
      courseId: args.courseId
    }
  });
}
