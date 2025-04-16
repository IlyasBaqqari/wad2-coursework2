import { classModel, courseModel } from '../models/instances/instances.js';

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
    console.error('ERROR - organiserController > dashboardPage: ', err);
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
    console.error('ERROR - organiserController > createCourse: ', err);
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
