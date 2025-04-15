import CourseModel from '../models/courseModel.js';
import ClassModel from '../models/classModel.js';

const courseModel = new CourseModel();
const classModel = new ClassModel();

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

    res.render('classDetails', { class: classData });
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

    res.render('courseDetails', { course, classes });
  } catch (err) {
    console.error('ERROR - controller > courseDetails: ', err);
    res.status(500).send('[500] Error loading course');
  }
};
