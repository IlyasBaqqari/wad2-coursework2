import ClassModel from '../models/classModel.js';
import CourseModel from '../models/courseModel.js';
import { mockClasses } from '../data/mockData/mockClasses.js';
import { mockCourses } from '../data/mockData/mockCourses.js';

const classModel = new ClassModel();
const courseModel = new CourseModel();

async function seed() {
  try {
    for (const course of mockCourses) {
      await courseModel.insert(course);
    }
    console.log('Inserted course mock data');

    for (const danceClass of mockClasses) {
      await classModel.insert(danceClass);
    }
    console.log('Inserted class mock data');

    console.log('\nMock data inserted');
    process.exit(0);
  } catch (err) {
    console.error('ERROR: Failed to seed mock data: ', err);
    process.exit(0);
  }
}

seed();
