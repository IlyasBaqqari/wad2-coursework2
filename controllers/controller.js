import {
  classModel,
  courseModel,
  enrolmentModel,
} from '../models/instances/instances.js';

export const homePage = async (req, res) => {
  try {
    const [courses, classes] = await Promise.all([
      courseModel.getAll(),
      classModel.getAll(),
    ]);

    res.render('homePage', {
      title: 'Home - Dance Booker',
      courses,
      classes,
    });
  } catch (err) {
    console.error('ERROR - controller > homePage: ', err);
    res.status(500).send('[500] Internal Server Error');
  }
};

export const classDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const classData = await classModel.getById(id);

    if (!classData) {
      return res.status(404).send('[404] Class not found');
    }

    res.render('classDetails', {
      title: `${classData.title} - Dance Booker`,
      class: classData,
      enrolForm: {
        title: 'Enter your name to book a space in this class',
        buttonText: 'Book this Class',
        classId: classData._id,
      },
    });
  } catch (err) {
    console.error('ERROR - controller > classDetails: ', err);
    res.status(500).send('[500] Error loading class');
  }
};

export const courseDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await courseModel.getById(id);
    const classes = await classModel.getAllByCourseId(course._id);
    if (!course) {
      return res.status(404).send('[404] Course not found');
    }

    res.render('courseDetails', {
      title: `${course.title} - Dance Booker`,
      course,
      classes,
      enrolForm: {
        title: 'Enter your name to enrol in this course',
        buttonText: 'Enrol in Course',
        courseId: course._id,
      },
    });
  } catch (err) {
    console.error('ERROR - controller > courseDetails: ', err);
    res.status(500).send('[500] Error loading course');
  }
};

export const handleEnrolment = async (req, res) => {
  const { name, classId, courseId } = req.body;

  if (!name || (!classId && !courseId)) {
    return res.status(400).send(`[400] Missing enrolment data:\n\n${req.body}`);
  }

  const type = courseId ? 'course' : 'class';

  const header =
    type === 'course' ? 'Enrolment Confirmed' : 'Booking Confirmed';
  const message =
    type === 'course'
      ? 'You have successfully been enrolled on the course.'
      : 'You have successfully made a booking for the class.';

  try {
    await enrolmentModel.insert({
      name,
      type,
      ...(classId && { classId }),
      ...(courseId && { courseId }),
    });

    res.render('enrolmentConfirmation', {
      title: `${header} - Dance Booker`,
      header,
      message,
    });
  } catch (err) {
    console.error('ERROR - controller > newEnrolment: ', err);
    res.status(500).send('[500] Error completing enrolment');
  }
};
