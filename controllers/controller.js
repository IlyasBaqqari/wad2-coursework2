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
    console.error('Error loading homepage: ', err);
    res.status(500).send('Internal Server Error');
  }
};
