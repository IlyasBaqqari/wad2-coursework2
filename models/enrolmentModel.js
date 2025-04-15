import nedb from 'gray-nedb';

class EnrolmentModel {
  constructor() {
    this.db = new nedb({ filename: './data/enrolments.db', autoload: true });
    console.log('Connected to enrolments DB');
  }

  getByClassId(classId) {
    return new Promise((resolve, reject) => {
      this.db.find({ classId }, (err, docs) => {
        if (err) {
          reject(err);
          console.error('ERROR - enrolmentModel > getByClassId(): ', err);
        } else {
          resolve(docs);
          console.log('enrolmentModel > getByClassId(): ', docs);
        }
      });
    });
  }

  getByCourseId(courseId) {
    return new Promise((resolve, reject) => {
      this.db.find({ courseId }, (err, docs) => {
        if (err) {
          reject(err);
          console.error('ERROR - enrolmentModel > getByCourseId(): ', err);
        } else {
          resolve(docs);
          console.log('enrolmentModel > getByCourseId(): ', docs);
        }
      });
    });
  }

  insert(enrolment) {
    return new Promise((resolve, reject) => {
      this.db.insert(enrolment, (err, doc) => {
        if (err) {
          reject(err);
          console.error('ERROR - enrolmentModel > insert(): ', err);
        } else {
          resolve(doc);
          console.log('enrolmentModel > insert(): ', doc);
        }
      });
    });
  }
}

export default EnrolmentModel;
