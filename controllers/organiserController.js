import {
  classModel,
  courseModel,
  enrolmentModel,
} from '../models/instances/instances.js';

export const loginPage = (req, res) => {
  const { err } = req.query;

  res.render('organiser/login', {
    title: 'Organiser Login - Dance Booker',
    error: err ? 'Invalid username or password' : null,
  });
};

export const handleLogin = (req, res) => {
  res.redirect('/organiser/dashboard');
};

export const dashboardPage = async (req, res) => {
  try {
    const [courses, classes] = await Promise.all([
      courseModel.getAll(),
      classModel.getAll(),
    ]);

    res.render('organiser/dashboard', {
      title: 'Organiser Dashboard - Dance Booker',
      courses,
      classes,
    });
  } catch (err) {
    console.error('ERROR - organiserController > dashboardPage(): ', err);
    res.status(500).send('[500] Internal Server Error');
  }
};

export const logout = (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/');
};

export const createCoursePage = (req, res) => {
  res.render('organiser/createCourse', {
    title: 'Create Course - Dance Booker',
    backLink: '/organiser/dashboard',
  });
};

export const createCourse = async (req, res) => {
  const { title, description, startDate, endDate, price } = req.body;

  try {
    await courseModel.insert({ title, description, startDate, endDate, price });
    res.redirect('/organiser/dashboard');
  } catch (err) {
    console.error('ERROR - organiserController > createCourse(): ', err);
    res.status(500).send('[500] Failed to create course');
  }
};

export const createClassPage = async (req, res) => {
  const courses = await courseModel.getAll();

  res.render('organiser/createClass', {
    title: 'Create Class - Dance Booker',
    backLink: '/organiser/dashboard',
    courses,
  });
};

export const createClass = async (req, res) => {
  const {
    title,
    description,
    date,
    time,
    duration,
    location,
    price,
    courseId,
  } = req.body;

  try {
    const newClass = {
      title,
      description,
      date,
      time,
      duration,
      location,
      price,
    };

    if (courseId) {
      newClass.courseId = courseId;
    }

    await classModel.insert(newClass);
    res.redirect('/organiser/dashboard');
  } catch (err) {
    console.error('ERROR - organiserController > createClass: ', err);
    res.status(500).send('[500] Failed to create class');
  }
};

export const manageClassPage = async (req, res) => {
  const classId = req.params.id;
  const danceClass = await classModel.getById(classId);
  const courses = (await courseModel.getAll()).map((course) => ({
    ...course,
    selected: course._id === danceClass.courseId,
  }));

  if (!danceClass) {
    return res.status(404).send('[404] Class not found');
  }

  res.render('organiser/manageClass', {
    title: `Manage Class - ${danceClass.title}`,
    backLink: `/class/${danceClass._id}`,
    class: danceClass,
    courses,
  });
};

export const updateClass = async (req, res) => {
  const classId = req.params.id;
  const {
    title,
    description,
    date,
    time,
    duration,
    location,
    price,
    courseId,
  } = req.body;

  const updated = {
    title,
    description,
    date,
    time,
    duration,
    location,
    price,
    courseId: courseId || null,
  };

  try {
    await classModel.update(classId, updated);
    res.redirect('/organiser/dashboard');
  } catch (err) {
    console.error('ERROR - organiserController > updateClass(): ', err);
    res.status(500).send('[500] Failed to update class');
  }
};

export const deleteClass = async (req, res) => {
  const classId = req.params.id;

  try {
    await classModel.delete(classId);
    res.redirect('/organiser/dashboard');
  } catch (err) {
    console.error('ERROR - organiserController > deleteClass(): ', err);
    res.status(500).send('[500] Failed to delete class');
  }
};

export const manageCoursePage = async (req, res) => {
  const courseId = req.params.id;
  const course = await courseModel.getById(courseId);

  if (!course) {
    return res.status(404).send('[404] Course not found');
  }

  res.render('organiser/manageCourse', {
    title: 'Manage Class - Dance Booker',
    backLink: `/course/${course._id}`,
    course,
  });
};

export const updateCourse = async (req, res) => {
  const courseId = req.params.id;
  const { title, description, startDate, endDate, price } = req.body;

  try {
    await courseModel.update(courseId, {
      title,
      description,
      startDate,
      endDate,
      price,
    });
    res.redirect('/organiser/dashboard');
  } catch (err) {
    console.error('ERROR - organiserController > updateCourse(): ', err);
    res.status(500).send('[500] Failed to update course');
  }
};

export const deleteCourse = async (req, res) => {
  const courseId = req.params.id;

  try {
    await courseModel.delete(courseId);
    res.redirect('/organiser/dashboard');
  } catch (err) {
    console.error('ERROR - organiserController > deleteCourse(): ', err);
    res.status(500).send('[500] Failed to delete course');
  }
};

export const manageClassEnrolmentsPage = async (req, res) => {
  const classId = req.params.id;
  const enrolments = await enrolmentModel.getByClassId(classId);

  res.render('organiser/enrolments', {
    title: 'Manage Class Bookings - Dance Booker',
    header: 'Manage Class Bookings',
    backLink: `/organiser/class/manage/${classId}`,
    enrolments,
    isClass: true,
  });
};

export const manageCourseEnrolmentsPage = async (req, res) => {
  const courseId = req.params.id;
  const enrolments = await enrolmentModel.getByCourseId(courseId);

  res.render('organiser/enrolments', {
    title: 'Manage Course Enrolments - Dance Booker',
    header: 'Manage Course Enrolments',
    backLink: `/organiser/course/manage/${courseId}`,
    enrolments,
    isCourse: true,
  });
};

export const deleteEnrolment = async (req, res) => {
  const enrolmentId = req.params.id;

  try {
    const enrolment = await enrolmentModel.getById(enrolmentId);
    if (!enrolment) {
      return res.status(404).send('[404] Enrolment not found');
    }

    await enrolmentModel.delete(enrolmentId);

    if (enrolment.type === 'course' && enrolment.courseId) {
      const relatedClasses = await classModel.getAllByCourseId(
        enrolment.courseId
      );

      for (const classItem of relatedClasses) {
        await enrolmentModel.deleteByUserAndClass(
          enrolment.name,
          classItem._id
        );
      }
    }

    let redirectUrl = '/organiser/dashboard';
    if (enrolment.type === 'course' && enrolment.courseId) {
      redirectUrl = `/organiser/course/manage/${enrolment.courseId}/enrolments`;
    } else if (enrolment.type === 'class' && enrolment.classId) {
      redirectUrl = `/organiser/class/manage/${enrolment.classId}/enrolments`;
    }
    res.redirect(redirectUrl);
  } catch (err) {
    console.error('ERROR - organiserControler > deleteEnrolment(): ', err);
    res.status(500).send('[500] Failed to delete enrolment');
  }
};
