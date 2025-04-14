import nedb from 'gray-nedb';

class CourseModel {
  constructor() {
    this.db = new nedb({ filename: './data/courses.db', autoload: true });
    console.log('Connected to courses DB');
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.db.find({}, (err, docs) => {
        if (err) {
          reject(err);
          console.error('ERROR - courseModel > getAll(): ', err);
        } else {
          resolve(docs);
          console.log('courseModel > getAll(): ', docs);
        }
      });
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      this.db.findOne({ _id: id }, (err, doc) => {
        if (err) {
          reject(err);
          console.error('ERROR - courseModel > getById(): ', err);
        } else {
          resolve(doc);
          console.log('courseModel > getById(): ', doc);
        }
      });
    });
  }

  insert(newCourse) {
    return new Promise((resolve, reject) => {
      this.db.insert(newCourse, (err, doc) => {
        if (err) {
          reject(err);
          console.error('ERROR - courseModel > insert(): ', err);
        } else {
          resolve(doc);
          console.log('courseModel > insert(): ', doc);
        }
      });
    });
  }
}

export default CourseModel;
